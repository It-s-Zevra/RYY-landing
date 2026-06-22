import type { ReactNode } from "react";
import { Fragment } from "react";

/**
 * Renderizador de contenido del post.
 *
 * El backend devuelve `content` como string. Para que se vea bien tanto si
 * llega texto plano como markdown ligero, parseamos por bloques:
 *  - `# / ## / ###`      → encabezados
 *  - `- ` / `* ` / `• `  → lista con viñetas
 *  - `1. `               → lista ordenada
 *  - `> `                → cita
 *  - `---`               → separador
 *  - línea en blanco     → separa párrafos
 *
 * Inline: **negrita**, *cursiva*, `código`, [texto](url) y URLs sueltas.
 */

type Block =
  | { type: "h2" | "h3" | "h4" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "hr" };

function parseBlocks(raw: string): Block[] {
  const lines = (raw || "").replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];

  let paragraph: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "p", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list && list.items.length) blocks.push(list);
    list = null;
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushAll();
      continue;
    }

    if (/^---+$|^\*\*\*+$/.test(line)) {
      flushAll();
      blocks.push({ type: "hr" });
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      blocks.push({
        type: level <= 1 ? "h2" : level === 2 ? "h3" : "h4",
        text: heading[2].trim(),
      });
      continue;
    }

    if (line.startsWith("> ")) {
      flushList();
      flushParagraph();
      blocks.push({ type: "quote", text: line.slice(2).trim() });
      continue;
    }

    const bullet = line.match(/^[-*•]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(bullet[1].trim());
      continue;
    }

    const ordered = line.match(/^\d+[.)]\s+(.*)$/);
    if (ordered) {
      flushParagraph();
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(ordered[1].trim());
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushAll();
  return blocks;
}

/** Parser inline mínimo: **negrita**, *cursiva*, `código`, enlaces y URLs. */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Orden importa: enlaces y código antes que énfasis.
  const pattern =
    /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(`([^`]+)`)|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(https?:\/\/[^\s)]+)/g;

  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(<Fragment key={key++}>{text.slice(last, match.index)}</Fragment>);
    }

    if (match[1]) {
      // [texto](url)
      nodes.push(
        <a
          key={key++}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-medium text-cape decoration-mint-dark underline-offset-4"
        >
          {match[2]}
        </a>,
      );
    } else if (match[4]) {
      // `código`
      nodes.push(
        <code
          key={key++}
          className="rounded bg-cape/5 px-1.5 py-0.5 font-mono text-[0.85em] text-cape"
        >
          {match[5]}
        </code>,
      );
    } else if (match[6]) {
      // **negrita**
      nodes.push(
        <strong key={key++} className="font-semibold text-cape">
          {match[7]}
        </strong>,
      );
    } else if (match[8]) {
      // *cursiva*
      nodes.push(
        <em key={key++} className="italic">
          {match[9]}
        </em>,
      );
    } else if (match[10]) {
      // URL suelta
      nodes.push(
        <a
          key={key++}
          href={match[10]}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline break-words font-medium text-cape decoration-mint-dark underline-offset-4"
        >
          {match[10]}
        </a>,
      );
    }

    last = pattern.lastIndex;
  }

  if (last < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  }

  return nodes;
}

export function Prose({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  if (!blocks.length) {
    return (
      <p className="text-pretty text-obsidian/70">
        Este artículo aún no tiene contenido.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="scroll-mt-28 pt-4 font-serif text-2xl font-medium leading-tight text-cape md:text-3xl"
              >
                {renderInline(block.text)}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="scroll-mt-28 pt-2 font-serif text-xl font-medium leading-snug text-cape md:text-2xl"
              >
                {renderInline(block.text)}
              </h3>
            );
          case "h4":
            return (
              <h4
                key={i}
                className="font-mono text-eyebrow uppercase tracking-widest text-obsidian"
              >
                {renderInline(block.text)}
              </h4>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-mint-dark pl-6 font-serif text-xl italic leading-relaxed text-cape/90 md:text-2xl"
              >
                {renderInline(block.text)}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-pretty leading-relaxed text-cape/80">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint-dark"
                    />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-pretty leading-relaxed text-cape/80">
                    <span
                      aria-hidden
                      className="mt-0.5 font-mono text-sm font-medium text-obsidian"
                    >
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ol>
            );
          case "hr":
            return <hr key={i} className="border-t border-obsidian/15" />;
          case "p":
          default:
            return (
              <p
                key={i}
                className="text-pretty text-[1.05rem] leading-relaxed text-cape/80 md:text-lg md:leading-[1.75]"
              >
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
