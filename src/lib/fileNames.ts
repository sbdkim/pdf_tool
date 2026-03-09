function stampDate(date = new Date()): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}${month}${day}`;
}

export function buildExportName(baseName: string, suffix: string, extension: 'pdf' | 'zip'): string {
  const cleanBase =
    baseName.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase() ||
    'pdf-foundry';
  return `${cleanBase}-${suffix}-${stampDate()}.${extension}`;
}
