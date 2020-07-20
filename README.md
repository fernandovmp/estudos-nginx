# nginx

Repositório com meus estudos sobre [nginx](https://nginx.org/)

Conteúdo usado:

-   [Guia de iniciante do nginx](https://nginx.org/en/docs/beginners_guide.html)

### Processos

nginx possui um processo 'mestre' e diversos _worker processes_ (processos de
trabalho)

**processo mestre:** Ler e aplicar as configurações, manter os _worker
processes_. Quando o processo mestre recebe um sinal para recarregar as
configurações ele inicia novos _worker processes_ e envia uma mensagem para os
_worker processes_ antigo desligarem, estes param de receber novas conexões,
porém continuaram a processar as requisições até todas serem servidas. Se as
novas configurações forem inválidas o processo mestre continuará a trabalhar com
a configuração antiga.

**worker processes:** Responsáveis por processar as requisições, o número de
_worker processes_ é definido no arquivo de configuração e pode ser fixo ou
ajustado de acordo como o número de CPU's disponíveis.

Para enviar um sinal para o processo do nginx:

```bash
$ nginx -s <signal>
```

Os sinais possíveis são:

-   _stop_ - encerrar o processo rapidamente
-   _quit_ - encerrar o processo 'elegantemente'
-   _reload_ - recarrega as configurações
-   _reopen_ - reabre o arquivo de log

Os sinais podem ser enviados diretamente a um processo do nginx por outras
ferramentas de linha de commando, exemplo:

```bash
# Considerando o PID do processo mestre do nginx como 2000
$ kill -s QUIT 2000
```

### Configurações

O arquivo de configuração do nginx consiste de diversas diretivas e blocos de
diretivas.

Uma diretiva simples é composta por um nome e seus parâmetros separados por
espaços, no fim da diretiva deve constar um ponto e virgula (;).

Um bloco de diretivas tem a mesma estrutura da diretiva simples, entretanto no
lugar do `;` haverá um bloco iniciado com `{` e terminado com `}` envolvendo um
conjunto de diretivas simples.

Se um bloco de diretivas contém outras diretivas é chamado de `context`
(contexto). Diretivas que não estão dentro de nenhum contexto são consideradas
como diretivas do contexto `main`.

Os contextos `events` e `http` pertencem ao contexto `main`, o contexto `server`
pertence ao contexto `http` e o contexto `location` pertence ao contexto
`server`

```
events {

}

http {
    server {
        location {

        }
    }
}
```
