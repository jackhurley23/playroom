import prettier from 'prettier/standalone';
import babylon from 'prettier/parser-babylon';

export const formatCode = ({ code, cursorOffset }) => {
  try {
    return prettier.formatWithCursor(code, {
      cursorOffset,
      parser: 'babylon',
      plugins: [babylon]
      // semi: false
    });
  } catch (error) {
    // Todo:
    throw new Error(error);
  }
};

export const positionToCursorOffset = (code, { line, ch }) => {
  return code.split('\n').reduce((pos, currLine, index) => {
    if (index < line) {
      return pos + currLine.length + 1;
    } else if (index === line) {
      return pos + ch;
    }
    return pos;
  }, 0);
};

export const cursorOffsetToPosition = (code, cursorOffset) => {
  const substring = code.slice(0, cursorOffset);
  const line = substring.split('\n').length - 1;
  const indexOfLastLine = substring.lastIndexOf('\n');

  return {
    line,
    ch: cursorOffset - indexOfLastLine - 1
  };
};
