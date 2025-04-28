// Tipos e constantes
export enum CellState {
  EMPTY = 'EMPTY',
  QUEEN = 'QUEEN',
  INVALID = 'INVALID', // Representa células que não podem receber uma dama
}

export interface Position {
  row: number;
  col: number;
}

export interface BoardProps {
  size: number; // Tamanho do tabuleiro (normalmente 8x8)
}

export class QueensGame {
  private board: CellState[][];
  private size: number;
  private queensCount: number;
  
  constructor(size: number = 8) {
    this.size = size;
    this.board = Array(size).fill(null).map(() => Array(size).fill(CellState.EMPTY));
    this.queensCount = 0;
  }
  
  // Retorna o tabuleiro atual
  getBoard(): CellState[][] {
    return this.board.map(row => [...row]);
  }
  
  // Retorna o número de damas posicionadas
  getQueensCount(): number {
    return this.queensCount;
  }
  
  // Verifica se uma posição é válida para colocar uma dama
  isValidQueenPosition(position: Position): boolean {
    const { row, col } = position;
    
    // Verifica se a posição está dentro do tabuleiro
    if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
      return false;
    }
    
    // Verifica se já existe uma dama nessa posição
    if (this.board[row][col] === CellState.QUEEN) {
      return false;
    }
    
    // Verifica se a posição está sob ataque de outra dama
    
    // Verifica a linha
    for (let c = 0; c < this.size; c++) {
      if (this.board[row][c] === CellState.QUEEN) {
        return false;
      }
    }
    
    // Verifica a coluna
    for (let r = 0; r < this.size; r++) {
      if (this.board[r][col] === CellState.QUEEN) {
        return false;
      }
    }
    
    // Verifica a diagonal principal (superior esquerda -> inferior direita)
    for (let i = -Math.max(row, col); i < this.size - Math.min(row, col); i++) {
      const r = row + i;
      const c = col + i;
      if (r >= 0 && r < this.size && c >= 0 && c < this.size && this.board[r][c] === CellState.QUEEN) {
        return false;
      }
    }
    
    // Verifica a diagonal secundária (superior direita -> inferior esquerda)
    for (let i = -Math.min(row, this.size - 1 - col); i < this.size - Math.min(this.size - 1 - row, col); i++) {
      const r = row + i;
      const c = col - i;
      if (r >= 0 && r < this.size && c >= 0 && c < this.size && this.board[r][c] === CellState.QUEEN) {
        return false;
      }
    }
    
    return true;
  }
  
  // Posiciona uma dama na posição especificada se for válido
  placeQueen(position: Position): boolean {
    if (this.isValidQueenPosition(position)) {
      this.board[position.row][position.col] = CellState.QUEEN;
      this.queensCount++;
      this.updateInvalidPositions();
      return true;
    }
    return false;
  }
  
  // Remove uma dama da posição especificada
  removeQueen(position: Position): boolean {
    const { row, col } = position;
    if (row >= 0 && row < this.size && col >= 0 && col < this.size && this.board[row][col] === CellState.QUEEN) {
      this.board[row][col] = CellState.EMPTY;
      this.queensCount--;
      this.updateInvalidPositions();
      return true;
    }
    return false;
  }
  
  // Atualiza as posições inválidas após colocar ou remover uma dama
  private updateInvalidPositions(): void {
    // Primeiro, resetamos todas as células para EMPTY exceto as que têm damas
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.board[r][c] !== CellState.QUEEN) {
          this.board[r][c] = CellState.EMPTY;
        }
      }
    }
    
    // Depois, marcamos as células sob ataque como INVALID
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.board[r][c] === CellState.QUEEN) {
          this.markInvalidPositions({ row: r, col: c });
        }
      }
    }
  }
  
  // Marca todas as posições que estão sob ataque de uma dama como inválidas
  private markInvalidPositions(queenPosition: Position): void {
    const { row, col } = queenPosition;
    
    // Marca a linha
    for (let c = 0; c < this.size; c++) {
      if (this.board[row][c] !== CellState.QUEEN) {
        this.board[row][c] = CellState.INVALID;
      }
    }
    
    // Marca a coluna
    for (let r = 0; r < this.size; r++) {
      if (this.board[r][col] !== CellState.QUEEN) {
        this.board[r][col] = CellState.INVALID;
      }
    }
    
    // Marca a diagonal principal (superior esquerda -> inferior direita)
    for (let i = -Math.max(row, col); i < this.size; i++) {
      const r = row + i;
      const c = col + i;
      if (r >= 0 && r < this.size && c >= 0 && c < this.size && this.board[r][c] !== CellState.QUEEN) {
        this.board[r][c] = CellState.INVALID;
      }
    }
    
    // Marca a diagonal secundária (superior direita -> inferior esquerda)
    for (let i = -Math.min(row, this.size - 1 - col); i < this.size; i++) {
      const r = row + i;
      const c = col - i;
      if (r >= 0 && r < this.size && c >= 0 && c < this.size && this.board[r][c] !== CellState.QUEEN) {
        this.board[r][c] = CellState.INVALID;
      }
    }
  }
  
  // Verifica se o jogo foi concluído (todas as damas foram posicionadas)
  isGameComplete(): boolean {
    return this.queensCount === this.size;
  }
  
  // Limpa o tabuleiro
  resetBoard(): void {
    this.board = Array(this.size).fill(null).map(() => Array(this.size).fill(CellState.EMPTY));
    this.queensCount = 0;
  }
  
  // Retorna um estado de célula específica
  getCellState(position: Position): CellState {
    const { row, col } = position;
    if (row >= 0 && row < this.size && col >= 0 && col < this.size) {
      return this.board[row][col];
    }
    return CellState.INVALID;
  }
}