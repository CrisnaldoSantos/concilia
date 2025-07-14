# 🔐 Configuração da API do Google Gemini

Para que a funcionalidade de análise de conflitos funcione corretamente, você precisa configurar uma API key do Google Gemini.

## 📋 Passo a Passo

### 1. Obter API Key do Google Gemini

1. Acesse [Google AI Studio](https://ai.google.dev/)
2. Faça login com sua conta Google
3. Clique em "Get API Key"
4. Crie um novo projeto ou selecione um existente
5. Copie sua API key

### 2. Configurar Variáveis de Ambiente

1. No diretório raiz do projeto, localize o arquivo `.env.local`
2. Substitua `your_google_api_key_here` pela sua API key real:

```env
GOOGLE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. Reiniciar o Servidor

Após configurar a API key, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 🔒 Segurança

- **NUNCA** commit sua API key no repositório
- O arquivo `.env.local` já está incluído no `.gitignore`
- Em produção, configure as variáveis de ambiente no seu provedor de hosting

## 🧪 Testando a API

Você pode testar se a API está funcionando acessando:

- `GET /api/analisar-conflito` - Verificar status
- `POST /api/analisar-conflito` - Analisar conflito

## 💡 Modelo Utilizado

A aplicação utiliza o modelo **Gemini 1.5 Pro** que oferece:

- Análise contextual avançada
- Respostas estruturadas e organizadas
- Compreensão empática de conflitos interpessoais
- Geração de recomendações práticas

## 🎯 Funcionalidades da API

- **Validação de entrada** com Zod
- **Saída estruturada** com schema definido
- **Tratamento de erros** robusto
- **Prompt engineering** otimizado para mediação
- **Integração com LangChain** para melhor controle
