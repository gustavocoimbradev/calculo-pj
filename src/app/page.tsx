'use client';

import { useState } from 'react';

import { NumericFormat } from 'react-number-format';

export default function Home() {

  const [aliquota, setAliquota] = useState<number | null>(null);
  const [rendimentoMensal, setRendimentoMensal] = useState<number | null>(null);
  const [rendimentoAnual, setRendimentoAnual] = useState<number | null>(null);
  const [imposto, setImposto] = useState<number | null>(null);  
  const [calculado, setCalculado] = useState<boolean>(false);
  const [calculando, setCalculando] = useState<boolean>(false);
  const [salarioMinimo, setSalarioMinimo] = useState<number | null>(null);  

  const realizarCalculo = () => {
    
    setCalculando(true);

    setTimeout(function(){
      const salarioMinimoTemp = 1518;
      setSalarioMinimo(salarioMinimoTemp);
      setCalculando(false);
      let aliquota;
      if ((rendimentoAnual??0) <= 180000) {
        aliquota = 0.0600; // 6,00%
      } else if ((rendimentoAnual??0) <= 360000) {
        aliquota = 0.1120; // 11,20%
      } else if ((rendimentoAnual??0) <= 720000) {
        aliquota = 0.1350; // 13,50%
      } else if ((rendimentoAnual??0) <= 1800000) {
        aliquota = 0.1600; // 16,00%
      } else if ((rendimentoAnual??0) <= 3600000) {
        aliquota = 0.2100; // 21,00%
      } else if ((rendimentoAnual??0) <= 3600000) {
        aliquota = 0.2100; // 21,00%
      } else if ((rendimentoAnual??0) <= 4800000) {
        aliquota = 0.3300; // 33,00%
      } else {
        aliquota = 0;
      }
      if (aliquota !== 0) {
        setAliquota(aliquota);
        setCalculado(true);
        setImposto((salarioMinimoTemp)*0.11+(rendimentoMensal?rendimentoMensal:0)*aliquota);
      } 
    }, 1000);

  }

  const novoCalculo = () => {
    setCalculado(false);
    setImposto(0);
    setRendimentoMensal(0);
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
                  value={rendimentoMensal}
                  onValueChange={(value) => {
                    const mensal = value.floatValue ?? 0;
                    setRendimentoMensal(mensal);
                    setRendimentoAnual(mensal * 12);
                  }}
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
                value={rendimentoMensal}
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
                <small className="text-slate-600 text-center mx-auto flex flex-col items-center flex-1">
                  <span className="font-bold block">Pró labore</span>
                  <NumericFormat
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
                  />
                </small>
                <small className="text-slate-600 text-center mx-auto flex flex-col items-center flex-1">
                  <span className="font-bold block">Rendimento anual</span>
                  <NumericFormat
                      name="rendimento"
                      placeholder="0,00"
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      fixedDecimalScale
                      prefix="R$ "
                      allowNegative={false}
                      value={rendimentoAnual}
                      displayType="text"
                    />
                </small>
                <small className="text-slate-600 text-center mx-auto flex flex-col items-center flex-1">
                  <span className="font-bold block">Alíquota aplicada</span>
                  <span>{((aliquota ?? 0) * 100).toString().slice(0, ((aliquota ?? 0) * 100).toString().indexOf('.') + 3)} %</span>
                </small>
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
