<br />
<p align="center">
  <a href="https://leonidasyopan.com/">
    <img src="https://leonidasyopan.com/img/logo-leonidas-yopan.png" alt="Logo Leonidas Yopan" width="300" height="94" target="_blank">
  </a>

  <h3 align="center">Resolução do Desafio Salesfy, etapa Backend.</h3>

  <p align="center">
    Essa é a minha resolução pessoal para o desafio da Salesfy de criar uma API que recebe qualquer Número Natural (Ex.: 12,135, 759, 185,874, etc...) e traduz (define) ele em Inglês.
    <br />
    <br />
    Mais informações sobre o desenvolvedor:
    <br />
    <a href="https://www.linkedin.com/in/leonidasyopan/" target="_blank">LinkedIn</a>
    ·
    <a href="https://twitter.com/leonidasyopan" target="_blank">Twitter</a>
    ·
    <a href="https://www.facebook.com/leonidasyopan" target="_blank">Facebook</a>
    ·
    <a href="https://leonidasyopan.com/" target="_blank">Portfolio</a>
  </p>
</p>

# Descrição de execução do template da Salesfy

Para instalação, rodar o comando:

```
_\$ yarn
```

Para rodar corretamente com maior produtividade para desenvolvimento, rode em terminais diferentes os seguintes comandos:

```
_\$ sudo yarn compile-watch_
```

-- Este comando é responsável por manter seu typescript sendo compilado a cada save. Você pode acompanhar neste terminal qualquer erro de escrita no seu programa.

```
_\$ sudo yarn nodemon_
```

-- A cada compilação bem sucedida, o Backend lança novamente e automaticamente uma nova versão no ar. Mantendo a execução sempre com a versão mais atualizada do código.

Caso esteja usando vsCode, é recomendado o uso da execução com debug, o que pode ser alcançado via arquivo launch.json. Em posse do arquivo, execute no vsCode o botão F5.

# Informações sobre como executar a API e testá-la

- Instale a API (junto com todas dependências):

```
yarn install
```

- Para rodar a API basta executar o seguinte commando no terminal aberto na pasta:

```
yarn nodemon
```

- No browser de sua preferência (recomendo o Google Chrome) acesse o endereço abaixo:
  **http://localhost:3333/?translate=525**
  (neste exemplo estou usando número 525, mas você pode usar qualquer Número Natural)

A API vai retornar um JSON com a sua tradução (no formato abaixo):

```
{
  "translation": "five hundred twenty-five"
}
```

A API está usando o pacote <a href="https://www.npmjs.com/package/cors" target="_blank">Cors</a>, isso permite o acesso de qualquer Interface (frontend), desde que a mesma seja direcionada para a porta adequada (ou URL, caso já tenha sido feito o Deploy da API).

# Destaques sobre o raciocínio da minha resolução

- Recebo e trato o número como uma _string_, assim não encontro problemas na limitação de 16 dígitos que o JavaScript tem para integers.
- As funções que fazem o "trabalho duro" da API estão separadas em uma pasta intitulada "services".
- Disponibilizei tradução para números até "centillion" isso seria (10 na 303 potencia) - é um nome muitíssimo grande.
- Nenhuma palavra chave única de número precisou ser listada mais de uma vez. Ou seja, a lista menciona apenas uma vez: ZERO, ONE, TWO,..., TEN, ELEVEN, TWELVE,..., TWENTY, THIRTY, ..., HUNDRED, THOUSAND, MILLION, ..., CENTILLION.
- Para que isso fosse possível dividir os números em grupos de 3 dígitos (que chamei de trios). Cada grupo desses está na casa de uma centena (hundred) e foi traduzido conforme várias condições (devidamente comentadas no código) e depois então concatenada para formar o número completa, adicionando-se por fim as palavras chaves: thousand, million, billion, etc.

Obs.: O código está comentado em cada um dos passos.

<!-- LICENSE -->

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

<!-- CONTACT -->

## Contato

Leônidas Yopán - [@leonidasyopan](https://twitter.com/leonidasyopan) - leonidasyopan@gmail.com

LinkedIn: [https://www.linkedin.com/in/leonidasyopan/](https://www.linkedin.com/in/leonidasyopan/)
