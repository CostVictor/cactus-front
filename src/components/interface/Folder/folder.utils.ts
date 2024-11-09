import { CSSProperties } from "react"

/**
 * Retorna um objeto de estilo com uma cor de fundo condicional.
 *
 * @param {number | boolean} [internal] - Valor opcional que determina a cor de fundo.
 *   - Se for um booleano, define a cor de fundo como `--bg-aba` quando `true`, ou `--bg-secondary` quando `false`.
 *   - Se for um número, usa a cor `--bg-secondary` para números pares e `--bg-aba` para ímpares.
 *   - Se não for passado nenhum valor, a cor padrão será `--bg-secondary`.
 *
 * @returns - Objeto de estilo com a cor de fundo ajustada.
 */
export const getStyleBackgroundColor = (internal?: number | boolean) => {
  const style: CSSProperties = { backgroundColor: "var(--bg-secondary)" }

  if (internal !== undefined) {
    if (typeof internal === "boolean") {
      style.backgroundColor = `var(--${internal ? "bg-aba" : "bg-secondary"})`
      return style
    }

    style.backgroundColor = `var(--${internal % 2 === 0 ? "bg-secondary" : "bg-aba"})`
    return style
  }

  return style
}
