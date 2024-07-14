import React, { useState } from "react";
// importado para correção de erro em build
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";

interface Machine {
  title: string;
  publication: string;
  edital: string;
  // Acrescentado para correção de erro build
  id: string;
  name: string;
  appkey: string;
  addressTittle: string;
  addressLabel: string;
  addressMaps: string;
  addressWaze: string;
  latitude: number;
  longitude: number;
  shortLink: string;
  ativa: boolean;
}

interface NumberProps {
  setMachines: Function;
  Machines: Machine[];
  machine: Machine;
}
export function CardModal(props: NumberProps) {
  const [showModal, setShowModal] = React.useState(false);

  const [name, setName] = useState("");
  const [machineRua, setMachineRua] = useState("");
  const [machineBairro, setMachineBairro] = useState("");
  const [ativa, setAtiva] = useState(false);

  // Definição de função updateMachine - exigida no build

  async function updateMachine(
    id: string,
    name: string,
    addressLabel: string,
    ativa: boolean
  ): Promise<void> {
    const requestBody = {
      name: name,
      addressLabel: addressLabel,
      ativa: ativa,
    };

    try {
      const response = await fetch(`https://api.exemplo.com/machines/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar a máquina");
      }

      const updatedMachine = await response.json();
      console.log("Máquina atualizada com sucesso:", updatedMachine);
      return updatedMachine;
    } catch (error) {
      console.error("Erro ao atualizar a máquina:", error);
      throw error;
    }
  }

  // Finalização da função

  async function handleUpdate() {
    const addressLabel = machineRua + " - " + machineBairro;
    updateMachine(props.machine.id, name, addressLabel, ativa);
    const updatedMachines = props.Machines.map((Machine) => {
      if (Machine.id === props.machine.id) {
        return {
          ...Machine,
          id: props.machine.id,
          name: name,
          appkey: props.machine.appkey,
          addressTittle: props.machine.addressTittle,
          addressLabel: addressLabel,
          addressMaps: props.machine.addressMaps,
          addressWaze: props.machine.addressWaze,
          latitude: props.machine.latitude,
          longitude: props.machine.longitude,
          shortLink: props.machine.shortLink,
          ativa: ativa,
        };
      }

      return Machine;
    });

    // Atualize o estado local de 'programs' com o novo array atualizado
    props.setMachines(updatedMachines);

    setShowModal(false);
  }

  function resetModal() {
    setName(props.machine.name);
    setMachineRua(props.machine.addressLabel.split(" - ")[0]);
    setMachineBairro(
      props.machine.addressLabel.split(" - ").slice(1).join(" - ")
    );
    setAtiva(props.machine.ativa);

    setShowModal(true);
  }

  return (
    <>
      <button
        title="Criar usuário"
        className="leading-none border-none outline-none rounded-xl p-2 px-3 cursor-pointer mb-6 mr-2 text-center"
        onClick={() => resetModal()}
      >
        <DriveFileRenameOutlineOutlinedIcon
          fontSize="medium"
          className="text-black hover:text-gray-200"
        />
      </button>

      {showModal ? (
        <>
          <div className="flex items-center justify-center min-h-screen overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div
              className={`text-center bg-gray-1000 shadow-lg shadow-gray-500 rounded-2xl w-[60vw] h-[40rem] pt-12`}
            >
              <div className="text-black font-bold text-2xl text-center mb-12 flex flex-row w-full justify-center items-center">
                <span className="ml-16 mr-16">{name}</span>
              </div>

              <div className="px-10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate();
                  }}
                  id="New usuario"
                  className="flex flex-col"
                >
                  <div className="relative mt-2 mb-8 w-full flex items-start flex-col gap-y-2">
                    <label
                      htmlFor="programName"
                      className={`text-generic-fields font-bold`}
                    >
                      Nome
                    </label>
                    <input
                      className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`}
                      id="programName"
                      spellCheck={false}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      required
                    />
                  </div>

                  <div className="relative mt-2 mb-8 w-full flex items-start flex-col gap-y-2">
                    <label
                      htmlFor="machineRua"
                      className={`text-generic-fields font-bold`}
                    >
                      Rua
                    </label>
                    <input
                      className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`}
                      id="machineRua"
                      spellCheck={false}
                      onChange={(e) => {
                        setMachineRua(e.target.value);
                      }}
                      value={machineRua}
                      required
                    />
                  </div>

                  <div className="relative mt-2 mb-8 w-full flex items-start flex-col gap-y-2">
                    <label
                      htmlFor="machineBairro"
                      className={`text-generic-fields font-bold`}
                    >
                      Bairro
                    </label>
                    <input
                      className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`}
                      id="machineBairro"
                      spellCheck={false}
                      onChange={(e) => {
                        setMachineBairro(e.target.value);
                      }}
                      value={machineBairro}
                      required
                    />
                  </div>

                  <div className="flex flex-row gap-x-5 justify-between items-center px-5">
                    <div className="mt-2 mb-8 flex items-start flex-col gap-y-2">
                      <label
                        htmlFor="machineAtiva"
                        className="text-generic-fields font-bold"
                      >
                        Ativa
                      </label>
                      <button
                        id="machineAtiva"
                        className={`relative w-[3em] h-[1.5em] flex items-center justify-center rounded-full transition-colors duration-300 ${ativa ? "bg-green-500" : "bg-gray-300"}`}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          setAtiva(!ativa);
                        }}
                        aria-label={ativa ? "Ativo" : "Não Ativo"}
                      >
                        <span
                          className={`absolute left-0 inline-block w-[1.5em] h-[1.5em] transform transition-transform duration-300 ease-in-out bg-white rounded-full ${ativa ? "translate-x-full" : "translate-x-0"}`}
                        ></span>
                      </button>
                    </div>

                    <div className="flex flex-row gap-x-10">
                      <button
                        title="Cadastrar"
                        type="submit"
                        className={`leading-none border-none outline-none rounded-xl bg-generic-tittleButton p-4 text-generic-bgLight font-bold cursor-pointer mb-6 shadow-button hover:shadow-button-hover-focus focus:shadow-button-hover-focus`}
                      >
                        Atualizar
                      </button>

                      <button
                        title="Fechar"
                        type="button"
                        className={
                          "leading-none border-none outline-none rounded-xl p-4 px-7 cursor-pointer mb-6 shadow-button hover:shadow-button-hover-focus focus:shadow-button-hover-focus"
                        }
                        onClick={() => setShowModal(false)}
                      >
                        Fechar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
