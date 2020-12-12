export function replaceSpaceToDash(str: string): string {
  return str.replace(/ /g, '-');
}

export function replaceDashToSpace(str: string | string[] ): string {
  ///@ts-ignore
  return str.replace(/-/g, ' ');
}