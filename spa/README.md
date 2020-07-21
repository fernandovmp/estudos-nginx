# Provendo uma Single Page Application

Como em uma _Single Page Application_ (SPA) existe apenas um arquivo
`index.html` e o conteúdo da página é determinado dinamicamente por javascript,
considerando que o arquivo `index.html` esteja na pasta `/data/www` a seguinte
configuração não funcionária pois o arquivo `index.html` não seria encontrado
quando tentássemos acessar `/produtos` ou qualquer outra URI que fosse mapeada
para outro diretório que não `/data/www`.

```
events {

}
http {
    server {
        root /data/www;
        location / {
        }
    }
}
```

Para garantir que o arquivo `/data/www/index.html` seja provido sempre podemos
usar uma diretiva `try_files`, essa diretiva verifica se o arquivo buscado
existe e sim devolve ele, caso contrário verifica o proxímo arquivo fornecido
como parâmetro.

Assim podemos verificar se o arquivo correspondente a URI solicitada existe, e
se não provemos o arquivo `index.html` encontrado na raiz de `/data/www`.

Para passarmos a URI solicitado como parâmetro utilizamos a variável `$uri`.

```
events {

}

http {
    server {
        root /data/www;
        location / {
            # try_files requer ao menos dois parâmetros
            try_files $uri /index.html;
        }
    }
}
```

> Note que o caminho para `index.html` inicia com '/' pois esse caminho será
> concatenado com o valor de `root` assim ficando `/data/www/index.html`. A
> variável `$uri` já inicia com '/'.

Essa configuração garante que independente da URI solicitada (/produtos,
/images, /images/home), sempre seja provido o arquivo `/data/www/index.html`
caso nenhum outro arquivo correspondente exista.
