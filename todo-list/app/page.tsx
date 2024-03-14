import Image from "next/image";

function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

function Header() {
  return (
    <header>
      <h1>Header</h1>
    </header>
  );

}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <header>
    <h1>PraFazê!</h1>
  </header>
    <form>
      <input type="text" placeholder="O que precisa ser feito?" />
      <button>Adicionar</button>
    </form>
    <ul>
      <li>
        <input type="checkbox" />
        <span>Comprar pão</span>
        <button>Remover</button>
      </li>
      <li>
        <input type="checkbox" />
        <span>Estudar para a FCC</span>
        <button>Remover</button>
      </li>
      <li>
        <input type="checkbox" />
        <span>Estudar para a FCS</span>
        <button>Remover</button>
      </li>
    </ul>
    </main>
  );
}
