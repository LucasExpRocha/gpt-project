import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import { SavedMessage } from "./SaveMessage";

const conceptsDDD = `Seguem conceitos do DDD (Domain Driven Design)

- Domain Driven Design (obrigatórios)
- Dominio - é o coração do negócio em que você está trabalhando.
- Domain Experts - stackholders para entender o funcionamento do negócio e evitar problemas de comunicação.
- Linguagem Ubiqua - é a linguagem falada no dia dia, no contexto da empresa. É a linguagem que utiliza as terminologias da realidade do negócio .
- Entidades - O DDD prega que as entidades devem desconhecer a existência do Banco de Dados
- Casos de Usos	(opcionais)
- Agregados - conjunto de objetos persistidos juntos ( Pedido e Produtos )
- Objetos de Valor - informações imutáveis que não geram entidades (com regras de negócios associadas)
- Serviços de domínios - Formas de abstrair lógicas da camada de domínios
- Eventos de Domínios - Informações importantes que acontecem no domínio. Como se conversam os domínios. São as ações.
- Bounded Contexts - Subdomínios, setores com funções específicas em cada um deles, e em alguns momentos se conversam.		

Você é uma empresa que desenvolve sistemas. O primeiro passo para começar um projeto é o cliente solicitar para você uma proposta comercial. 
    `;

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dddValue, setDddValue] = useState(conceptsDDD);
  const [showMessage, setShowMessage] = useState(false);

  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);

  const handleChangePromptDDD = ({ target }: any) => setDddValue(target.value);
  const handleSavePromptDDD = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1500);
    localStorage.setItem("promptDDD", dddValue);
  };

  useEffect(() => {
    setDddValue(localStorage.getItem("promptDDD") || conceptsDDD);
  }, []);

  return (
    <header className="flex justify-between max-w-4xl w-full mx-auto my-2">
      <button
        onClick={handleOpenModal}
        className="rounded bg-slate-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Prompt DDD
      </button>
      <button className="rounded bg-slate-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        Gerar Proposta
      </button>
      <Modal closeModal={handleCloseModal} isOpen={isOpen}>
        <textarea
          className="w-full min-h-vh-minus-200 min-max-w-7xl resize-none bg-transparent p-2"
          onChange={handleChangePromptDDD}
          defaultValue={dddValue}
        />
        <button
          onClick={handleSavePromptDDD}
          className="rounded bg-slate-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Salvar
        </button>
        <button
          onClick={handleCloseModal}
          className="rounded bg-red-600 ml-2 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Fechar
        </button>
      </Modal>
      {showMessage && <SavedMessage />}
    </header>
  );
};
