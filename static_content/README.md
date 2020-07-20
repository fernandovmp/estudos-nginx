# Provendo arquivos estáticos

Para prover arquivos estáticos como arquivos html, css ou imagens que estejam na
pasta `/data/www` basta adicionar ao contexto `server` um bloco `location` com o
parâmetro `/`, isso fará que qualquer URI requisitada seja servida por esse
bloco.

Ao encontrar um bloco `location` que corresponda a URI requisitada, a URI é
adicionada ao caminho especificado na diretiva `root`

```
events {

}
http {
    server {
        location / {
            root /data/www;
        }
    }
}
```

Assim, se for requisitado a URI raiz do `/` o servidor devolverá o arquivo
`/data/www/index.html`, se for requisitado `/home.html` o servidor devolverá o
aquivo `/data/www/home.html`, se for requisitado `/produtos/cafe.png` o servidor
devolverá o arquivo `/data/www/produtos/cafe.png` e assim por diante.

Porém se quisermos servir na URI `/images` os arquivos da pasta `/data/images/`
e não da pasta `/data/www/images/` podemos definir outro bloco `location` com
outro parâmetro, nesse caso o parâmetro `/images/` ao invés de `/`.

```
events {

}
http {
    server {
        location / {
            root /data/www;
        }
        location /images/ {
            root /data;
        }
    }
}
```

Dessa forma toda URI requisitada que comece com /images/ usará como raiz do
caminho à buscar o aquivo o diretório `/data` e não `/data/www`.

> Foi definido como raiz o diretório `/data` e não o `/data/images` pois a URI
> sempre é adicionada a raiz especificada para buscar o arquivo, então se fosse
> solicitada `/images/image_a.jpg/` o servidor tentaria buscar o arquivo
> `data/images/images/image_a.jpg`, deixando apenas `/data` o servidor irá
> buscar corretamente no diretório `/data/images/image_a.jpg`

Quando há múltiplos blocos de `location` o nginx irá escolher o que tiver o
parâmetro `prefix` de maior comprimento, como o primeiro bloco `location` tem um
prefixo de apenas um caractere este será escolhido apenas se todos os outros
`location`'s falharem, isto é, não corresponderem a URI solicitada.

Se o arquivo buscado não existir o nginx responderá com o erro `404 not found`
