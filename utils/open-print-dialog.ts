import { AnalysisResult, ConflictData } from "@/app/analisar/types";

export const openPrintDialog = (
  analysisResult: AnalysisResult | null,
  data: ConflictData
) => {
  if (!analysisResult) {
    alert("Nenhuma análise disponível para impressão.");
    return;
  }

  // Cria uma nova janela com o conteúdo da análise otimizado para impressão
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert(
      "Não foi possível abrir a janela de impressão. Verifique se o bloqueador de pop-ups está desabilitado."
    );
    return;
  }

  const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>ConcilIA - Análise de Conflito</title>
          <meta charset="UTF-8">
          <style>
            @media print {
              @page {
                margin: 2cm;
                size: A4;
              }
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
            }
            
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background: white;
            }
            
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 3px solid #059669;
              padding-bottom: 20px;
            }
            
            .header h1 {
              color: #059669;
              font-size: 36px;
              margin: 0 0 10px 0;
              font-weight: bold;
            }
            
            .header h2 {
              color: #6b7280;
              font-size: 20px;
              margin: 0;
              font-weight: normal;
            }
            
            .header .date {
              color: #9ca3af;
              font-size: 14px;
              margin-top: 10px;
            }
            
            .section {
              margin-bottom: 30px;
              page-break-inside: avoid;
            }
            
            .section h3 {
              color: #374151;
              font-size: 18px;
              margin-bottom: 15px;
              font-weight: bold;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 5px;
            }
            
            .info-box {
              background: #f8f9fa;
              padding: 15px;
              border-left: 4px solid #059669;
              margin-bottom: 20px;
            }
            
            .recommendation {
              background: #f8f9fa;
              padding: 15px;
              margin-bottom: 15px;
              border-left: 4px solid #059669;
              border-radius: 4px;
            }
            
            .recommendation h4 {
              margin: 0 0 8px 0;
              color: #374151;
              font-size: 16px;
              font-weight: bold;
            }
            
            .priority {
              display: inline-block;
              padding: 3px 8px;
              border-radius: 4px;
              font-size: 10px;
              text-transform: uppercase;
              font-weight: bold;
              margin-left: 8px;
            }
            
            .priority.alta {
              background: #fee2e2;
              color: #dc2626;
            }
            
            .priority.media {
              background: #fef3c7;
              color: #d97706;
            }
            
            .priority.baixa {
              background: #dcfce7;
              color: #16a34a;
            }
            
            .message-box {
              padding: 20px;
              margin-bottom: 15px;
              border-radius: 8px;
              border-left: 4px solid;
            }
            
            .message-box.blue {
              background: #eff6ff;
              border-color: #3b82f6;
              color: #1e40af;
            }
            
            .message-box.purple {
              background: #faf5ff;
              border-color: #8b5cf6;
              color: #7c3aed;
            }
            
            .message-box h4 {
              margin: 0 0 10px 0;
              font-weight: bold;
            }
            
            ul, ol {
              padding-left: 20px;
            }
            
            li {
              margin-bottom: 8px;
            }
            
            .steps {
              counter-reset: step-counter;
            }
            
            .steps li {
              counter-increment: step-counter;
              position: relative;
              padding-left: 30px;
            }
            
            .steps li::before {
              content: counter(step-counter);
              position: absolute;
              left: 0;
              top: 0;
              background: #059669;
              color: white;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-weight: bold;
            }
            
            .footer {
              text-align: center;
              margin-top: 50px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #9ca3af;
              font-size: 12px;
            }
            
            @media screen {
              body {
                background: #f3f4f6;
                padding: 40px 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>ConcilIA</h1>
            <h2>Análise de Conflito</h2>
            <div class="date">Gerado em ${new Date().toLocaleDateString(
              "pt-BR"
            )}</div>
          </div>
          
          <div class="info-box">
            <strong>Envolvidos:</strong> ${data.pessoa1 || "N/A"} e ${
    data.pessoa2 || "N/A"
  }
          </div>

          <div class="section">
            <h3>RESUMO DO CONFLITO</h3>
            <p>${analysisResult.resumo || "Não disponível"}</p>
          </div>

          ${
            analysisResult.causasPrincipais?.length
              ? `
          <div class="section">
            <h3>CAUSAS PRINCIPAIS</h3>
            <ul>
              ${analysisResult.causasPrincipais
                .map((causa) => `<li>${causa}</li>`)
                .join("")}
            </ul>
          </div>
          `
              : ""
          }

          ${
            analysisResult.pontosComuns?.length
              ? `
          <div class="section">
            <h3>PONTOS EM COMUM</h3>
            <ul>
              ${analysisResult.pontosComuns
                .map((ponto) => `<li>${ponto}</li>`)
                .join("")}
            </ul>
          </div>
          `
              : ""
          }

          ${
            analysisResult.recomendacoes?.length
              ? `
          <div class="section">
            <h3>RECOMENDAÇÕES</h3>
            ${analysisResult.recomendacoes
              .map(
                (rec, index) => `
              <div class="recommendation">
                <h4>
                  ${index + 1}. ${rec.titulo}
                  <span class="priority ${rec.prioridade}">${
                  rec.prioridade
                }</span>
                </h4>
                <p>${rec.descricao}</p>
              </div>
            `
              )
              .join("")}
          </div>
          `
              : ""
          }

          ${
            analysisResult.proximosPassos?.length
              ? `
          <div class="section">
            <h3>PRÓXIMOS PASSOS</h3>
            <ol class="steps">
              ${analysisResult.proximosPassos
                .map((passo) => `<li>${passo}</li>`)
                .join("")}
            </ol>
          </div>
          `
              : ""
          }

          ${
            analysisResult.empatia
              ? `
          <div class="section">
            <h3>MENSAGENS PERSONALIZADAS</h3>
            <div class="message-box blue">
              <h4>Para ${data.pessoa1}:</h4>
              <p>${analysisResult.empatia.mensagemPara1}</p>
            </div>
            <div class="message-box purple">
              <h4>Para ${data.pessoa2}:</h4>
              <p>${analysisResult.empatia.mensagemPara2}</p>
            </div>
          </div>
          `
              : ""
          }

          <div class="footer">
            <p>Gerado por ConcilIA - Inteligência Artificial para Resolução de Conflitos</p>
            <p>© ${new Date().getFullYear()} - Todos os direitos reservados</p>
          </div>
        </body>
      </html>
    `;

  printWindow.document.write(printContent);
  printWindow.document.close();

  // Aguarda o carregamento e abre o diálogo de impressão
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    }, 250);
  };
};
