'use client';

import { useState } from 'react';

import { NumericFormat } from 'react-number-format';

export default function Home() {

  const [rendimento, setRendimento] = useState<number | null>(null);
  const [imposto, setImposto] = useState<number | null>(null);  
  const [calculado, setCalculado] = useState<boolean>(false);
  const [calculando, setCalculando] = useState<boolean>(false);
  const [salarioMinimo, setSalarioMinimo] = useState<number | null>(null);  

  const realizarCalculo = () => {
    
    setCalculando(true);

    // API DESATUALIZADA
    // fetch('https://salario-minimo.onrender.com/')
    // .then(response => response.json())
    // .then(data => {
    //   setSalarioMinimo(data[0].salary);
    //   setSalarioMinimo(data[0].salary);
    //   setCalculando(false);
    //   setCalculado(true);
    //   setImposto((data[0].salary)*0.11+(rendimento?rendimento:0)*0.06);
    // })
    // .catch(error => console.error('Erro:', error));

    // SOLUÇÃO TEMPORÁRIA
    setTimeout(function(){
      const salarioMinimoTemp = 1518;
      setSalarioMinimo(salarioMinimoTemp);
      setCalculando(false);
      setCalculado(true);
      setImposto((salarioMinimoTemp)*0.11+(rendimento?rendimento:0)*0.06);
    }, 1000);

  }

  const novoCalculo = () => {
    setCalculado(false);
    setImposto(0);
    setRendimento(0);
  }

  return (
    <>
      <div className="h-[100dvh] w-[100dvw] grid place-items-center bg-slate-100">
        <div className="flex flex-col items-center justify-center w-[556px] max-w-[90dvw]">
          <div className="mb-7">
            <h1 className="text-center mb-3 text-4xl text-slate-600">Cálculo <strong className="text-indigo-600">PJ</strong></h1>
            <p className="text-center text-md text-slate-600">Verifique o valor a pagar referente ao <span className="text-indigo-600">Simples Nacional</span> da sua <span className="text-indigo-600">PJ</span></p>
          </div>
          {!calculado?(
            <div className="w-full rounded-xl shadow-md shadow-slate-100 overflow-hidden mb-8">
              <div className="px-6 py-4 bg-indigo-600 text-white">
                <h1 className="text-md">Informe o seu rendimento</h1>
              </div>
              <div className="bg-white flex">
                <label htmlFor="rendimento" className="text-md text-slate-600 font-medium px-6 py-4">R$</label>
                <NumericFormat
                  name="rendimento"
                  className="pe-6 py-4 w-full h-full outline-none border-none placeholder:text-md text-slate-600"
                  placeholder="0,00"
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  allowNegative={false}
                  value={rendimento}
                  onValueChange={(value) => setRendimento(value.floatValue ?? 0)} 
                />
              </div>
            </div>
          ) : (
            <div className="w-full rounded-xl shadow-md shadow-slate-100 overflow-hidden mb-8 text-center">
              <div className="px-6 py-4 pt-6 text-slate-600 bg-white ">
                <p className="text-md">Para um rendimento de <NumericFormat
                name="rendimento"
                className="font-bold text-indigo-600"
                placeholder="0,00"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                prefix="R$ "
                allowNegative={false}
                value={rendimento}
                displayType="text"
              /> você terá que pagar</p>
              </div>
              <div className="bg-white flex">
                <NumericFormat
                  name="rendimento"
                  className="px-6 pb-6 w-full h-full outline-none border-none placeholder:text-md text-4xl text-indigo-600 font-bold"
                  placeholder="0,00"
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  prefix="R$ "
                  allowNegative={false}
                  value={imposto}
                  displayType="text"
                />
              </div>
              <div className="bg-white flex px-6 pb-6 ">
                <small className="text-slate-600 text-center mx-auto block">* Cálculo realizado considerando o salário mínimo de <NumericFormat
                name="rendimento"
                placeholder="0,00"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                prefix="R$ "
                allowNegative={false}
                value={salarioMinimo}
                displayType="text"
              />.</small>
              </div>
            </div>
          )}
          {!calculado?( 
            !calculando?(
              <div className="flex gap-2 w-full">
                <button onClick={realizarCalculo} className="flex-1 py-3 px-4 bg-indigo-600 border-2 border-indigo-600 rounded-full text-white transition-all ease-in-out hover:bg-indigo-700 hover:text-white">
                  Verificar valor
                </button>
              </div>
            ):(
              <div className="flex gap-2 w-full">
                <button onClick={realizarCalculo} className="flex-1 py-3 px-4 bg-indigo-600 border-2 border-indigo-600 rounded-full text-white transition-all ease-in-out hover:text-white opacity-50 disabled" disabled>
                  Verificando valor...
                </button>
              </div>
            )
          ):(
            <div className="flex gap-2 w-full">
              <button onClick={novoCalculo} className="flex-1 py-3 px-4 bg-transparent border-2 border-indigo-600 rounded-full text-indigo-600 transition-all ease-in-out hover:border-indigo-700 hover:text-indigo-600">
                Verificar outro valor
              </button>
            </div>
          )}
        </div>
      </div>  
    </>
  );
}
