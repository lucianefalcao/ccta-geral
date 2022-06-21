export default class Usuario {
  constructor(private id: string, private nome: string, private email: string) {
    this.validar();
  }

  getId(): string {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getEmail(): string {
    return this.email;
  }

  validar(): void {
    if (this.id.length === 0) {
      throw new Error('O id é obrigatório');
    }

    if (this.nome.length === 0) {
      throw new Error('O nome é obrigatório');
    }

    if (this.email.length === 0) {
      throw new Error('O email é obrigatório');
    }
  }
}
