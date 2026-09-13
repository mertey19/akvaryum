"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Icon } from "./icon";
const projects = [
  {
    id: "bitkili",
    name: "Yeşilin içinde bir dünya",
    type: "Bitkili konsept",
    image: "/images/hero.webp",
    description:
      "Bitki, kaya ve doğal kök dokularını dengeli bir kompozisyonda buluşturan kurulum ilhamı.",
    permission: "generated-demo",
  },
];
export function Projects() {
  const [filter, setFilter] = useState("all");
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
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
        <button
          className="chip"
          aria-pressed={filter === "bitkili"}
          onClick={() => setFilter("bitkili")}
        >
          Bitkili konsept
        </button>
      </div>
      {projects
        .filter((p) => filter === "all" || p.id === filter)
        .map((p) => (
          <article key={p.id} className="project-showcase">
            <button
              ref={opener}
              onClick={() => dialog.current?.showModal()}
              aria-label={`${p.name} görselini aç`}
            >
              <Image
                src={p.image}
                alt="Bitkiler ve doğal kökle düzenlenmiş akvaryum"
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
        <Image
          src="/images/hero.webp"
          alt="Bitkiler ve doğal kökle düzenlenmiş akvaryum"
          width={1536}
          height={1024}
        />
        <p>Bitkili akvaryum kurulum ilhamı</p>
      </dialog>
    </>
  );
}
