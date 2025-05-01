# BlueStash Currency 💰

Aplicação web para acompanhamento de criptomoedas em tempo real, com recursos de busca, favoritos e visualização detalhada.

![BlueStash Currency Logo](./src/assets/BlueStashCurrency.svg)

## 🚀 Funcionalidades

- ✨ Lista de criptomoedas com preços em tempo real
- 🔍 Busca por nome ou símbolo da moeda
- ⭐ Sistema de favoritos com persistência local
- 📊 Dashboard com maiores altas e baixas
- 📱 Design responsivo
- 💫 Animações suaves e interface intuitiva

## 🛠️ Tecnologias

- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Vite](https://vitejs.dev/) - Build tool e bundler
- [React Router](https://reactrouter.com/) - Roteamento da aplicação
- [React Icons](https://react-icons.github.io/react-icons/) - Ícones
- [CoinCap API](https://docs.coincap.io/) - API de dados de criptomoedas

## 📦 Instalação

1. Clone o repositório:
\`\`\`bash
git clone [url-do-repositorio]
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Adicione sua chave da API do CoinCap

4. Inicie o servidor de desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`

## 🔧 Scripts Disponíveis

- \`npm run dev\` - Inicia o servidor de desenvolvimento
- \`npm run build\` - Gera a build de produção
- \`npm run lint\` - Executa a verificação de lint
- \`npm run preview\` - Visualiza a build de produção localmente

## 📱 Layout Responsivo

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela:
- Desktop: Layout completo com tabelas e cards
- Mobile: Layout adaptativo com visualização em lista

## 🔒 Armazenamento Local

- Favoritos são salvos no localStorage do navegador
- Chave utilizada: "@bluestash"

## 💡 Recursos da Interface

### Página Inicial
- Tabela de criptomoedas com ordenação
- Sistema de paginação com "Carregar mais"
- Busca em tempo real
- Favoritar/desfavoritar moedas

### Página de Favoritos
- Dashboard com maiores altas e baixas
- Cards interativos com informações detalhadas
- Lista completa de moedas favoritas
- Remoção rápida de favoritos

### Página de Detalhes
- Informações detalhadas da moeda
- Preço em tempo real
- Variação percentual
- Opção de favoritar/desfavoritar

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (\`git checkout -b feature/AmazingFeature\`)
3. Faça o Commit de suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Faça o Push para a Branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Marcos Anjos**
- Website: [marcosanjos.site](https://www.marcosanjos.site/)

---

Desenvolvido com 💛 por Marcos Anjos | BlueStash
