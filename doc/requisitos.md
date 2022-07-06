# Requisitos do Portal CCTA

## Requisitos Funcionais

- **[RF001] Visualizar editais**:
  A aplicação deve permitir que qualquer usuário visualize os editais cadastrados.

- **[RF002] Baixar os documentos de editais**:
  A aplicação deve permitir que qualquer usuário baixe o documento na sua máquina.

- **[RF003] Visualizar notícias**:
  A aplicação deve permitir que qualquer usuário visualize apenas as notícias com o estado “Publicado”.

- **[RF004] Compartilhar as notícias**:
  A aplicação deve permitir que qualquer usuário compartilhe o link das notícias no WhatsApp ou Twitter.

- **[RF005] Visualizar eventos**:
  A aplicação deve permitir que qualquer usuário visualize os eventos a partir do mês do acesso.

- **[RF006] Adicionar um evento no Google Calendar**:
  A aplicação deve permitir que qualquer usuário adicione um evento na sua agenda do Google.

- **[RF007] Compartilhar os eventos**:
  A aplicação deve permitir que qualquer usuário compartilhe o link dos eventos no WhatsApp ou Twitter.

- **[RF008] Solicitar atendimento**:
  A aplicação deve permitir que qualquer usuário possa solicitar um atendimento via chat. Antes da solicitação, o usuário deve fornecer o seu nome apenas para identificação.

- **[RF009] Visualizar a descrição do centro**:
  A aplicação deve permitir que qualquer usuário possa visualizar a descrição do centro.

- **[RF010] Visualizar os cursos**
  A aplicação deve permitir que qualquer usuário possa visualizar os cursos do centro e suas informações, como a descrição, quantidade de períodos, tipo, subtipo e turno.

- **[RF011] Visualizar o mapa com a localização do centro**:
  A aplicação deve permitir que qualquer usuário possa visualizar o mapa do Google Maps com a localização do CCTA.

## Requisitos Não Funcionais

### Usabilidade

- **[RNF001] Fácil manipulação**:
  A aplicação deverá ser operada por usuários sem a necessidade de treinamento prévio.

- **[RNF002] Responsividade**:
  A aplicação deverá fazer uso de design responsivo na implementação de sua interface gráfica que se adapta a tela do usuário.

- **[RNF003] Instalável**:
  O usuário deverá ser capaz de instalar o app no seu celular (Android/iOS) e no seu desktop (Windows/MacOS), além de utilizar o navegador.

- **[RNF004] Offline**
  A aplicação deverá exibir uma mensagem quando identificar que o usuário não possui conexão com a Internet informando que o mesmo precisa de acesso para utilizá-la.

- **[RNF005] Linguagem**
  A aplicação deverá ser disponibilizada em português.

- **[RNF006] Internet**
  O usuário deverá ter acesso à Internet para acessar o sistema.

### Portabilidade

- **[RNF007] Compatibilidade**:
  A aplicação deverá funcionar no Google Chrome e Firefox a partir da versão 96.0 ambos os navegadores.

### Confiabilidade

- **[RNF008] Disponibilidade**:
  A aplicação deverá ter alta disponibilidade, por exemplo, 97% do tempo.

- **[RNF009] Erros no sistema**:
  A aplicação deverá exibir os 80% dos erros que impedem o fluxo das atividadespara o usuário.

### Organizacional

- **[RNF010] Versionamento**
  O versionamento da aplicação deverá ser feito a partir da plataforma GitHub da autora deste trabalho.

- **[RNF011] Gerenciamento de atividades**
  Uso do GitHub, para definir e administrar o andamento das tarefas.

### Implementação

- **[RNF012] Paradigma de programação**:
  A implementação deverá utilizar programação orientada a objeto.

- **[RNF013] Princípios SOLID**:
  A implementação deverá obedecer os padrões SOLID sempre que possível.

- **[RNF014] PWA**:
  A aplicação deverá ser implementada para ser um Progressive Web App (PWA).

- **[RNF015] Tecnologias**:
  A implementação utilizará os frameworks Vue.js, e Quasar, ambos na versão mínima 2.0. A linguagem TypeScript na versão mínima 4.5. Para gerenciamento do estado, deve-se utilizar o Pinia na versão 2.0 e o Vue Router para a gestão das rotas.

### Interoperabilidade

- **[RNF016] Comunicação com Firestore Database**:
  A aplicação deverá utilizar o Firestore Database do Firebase para realizar a consulta de dados.

- **[RNF017] Comunicação com Realtime Database**:
  A aplicação deverá utilizar o Realtime Database do Firebase para a troca de mensagens.

- **[RNF018] Comunicação com Firebase Storage**:
  A aplicação deverá utilizar o Firebase Storage para acessar documentos e imagens. Assim como, permitir que o usuário realize o download dos documentos.

- **[RNF019] Comunicação com a API do WhatsApp**
  A aplicação deverá utilizar a API do WhatsApp para o compartilhamento do link de notícias e eventos.

- **[RNF020] Comunicação com a API do Twitter**
  A aplicação deverá utilizar a API do Twitter para o compartilhamento do link de notícias e eventos.

- **[RNF021] Comunicação com a API do Google Maps**
  A aplicação deverá utilizar a API do Google Maps para exibir a localização do CCTA.

### Privacidade

- **[RNF022] Dados do usuário**:
  A aplicação pedirá apenas o nome do usuário no momento do atendimento online.
