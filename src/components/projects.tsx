"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Project } from "@/lib/content/schema";
import { Icon } from "./icon";
export function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const types = [...new Set(projects.map((p) => p.type))];
  function close() {
    dialog.current?.close();
    opener.current?.focus();
  }
  return (
    <>
      <div className="chips">
        <button
          className="chip"
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          Tümü
        </button>
        {types.map((type) => (
          <button
            key={type}
            className="chip"
            aria-pressed={filter === type}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>
      {projects
        .filter((p) => filter === "all" || p.type === filter)
        .map((p) => (
          <article key={p.id} className="project-showcase">
            <button
              onClick={(e) => {
                opener.current = e.currentTarget;
                setActive(p);
                dialog.current?.showModal();
              }}
              aria-label={`${p.name} görselini aç`}
            >
              <Image
                src={p.image}
                alt={p.imageAlt}
                width={1536}
                height={1024}
                sizes="(max-width: 768px) 100vw, 70vw"
              />
            </button>
            <div>
              <span className="eyebrow">{p.type}</span>
              <h2>{p.name}</h2>
              <p>{p.description}</p>
            </div>
          </article>
        ))}
      <dialog className="lightbox" ref={dialog} onCancel={close}>
        <button
          className="icon-button close-lightbox"
          aria-label="Görseli kapat"
          onClick={close}
        >
          <Icon name="close" />
        </button>
        {active && (
          <>
            <Image
              src={active.image}
              alt={active.imageAlt}
              width={1536}
              height={1024}
            />
            <p>{active.name}</p>
          </>
        )}
      </dialog>
    </>
  );
}
