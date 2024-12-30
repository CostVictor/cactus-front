/**
 * Filtra as diferenças entre dois objetos genéricos.
 *
 * A função compara recursivamente `baseData` e `compareData` para identificar as propriedades que foram alteradas,
 * ignorando valores nulos em `compareData`. Para objetos aninhados, verifica as diferenças em cada nível.
 *
 * @template T - Tipo genérico que deve ser um objeto.
 * @param {T} baseData - O objeto base utilizado como referência.
 * @param {T} compareData - O objeto a ser comparado com o objeto base.
 * @returns {T} Um novo objeto contendo apenas os valores alterados de `compareData`.
 */
export const filterDifferences = <T extends object>(baseData: T, compareData: T): T => {
  const mutableData: Record<string, any> = {};

  for (const key in baseData) {
    if (key in compareData) { // Usa o operador in para verificar a existência da chave
      const baseValue = baseData[key] ?? '';
      const compareValue = compareData[key] ?? '';

      if (typeof baseValue === "object" && typeof compareValue === "object") {
        const nestedDifferences = filterDifferences(baseValue as T, compareValue as T);

        if (Object.keys(nestedDifferences).length) {
          mutableData[key] = nestedDifferences;
        }
      } else if (baseValue !== compareValue) {
        mutableData[key] = compareValue;
      }
    }
  }

  return mutableData as T;
};
