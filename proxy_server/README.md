# Servidor proxy

Como exemplo simples para criar um servidor proxy, primeiro definimos um outro
bloco de servidor que escutará a porta 8080.

```
server {
    listen 8080;
    root /data/up1;

    location / {

    }
}
```

Agora no bloco server que escuta a porta 80, colocamos a diretiva `proxy_pass`
com o parâmetro `http://localhost:8080` para que toda a requisição que seja
resolvida por essa location seja passada para a porta 8080 e assim resolvida
pelo segundo bloco `server`

```
events {

}
http {
    server {
        location / {
            proxy_pass http://localhost:8080
        }
        location ~\.(png|jpg|gif) {
            root /data;
        }
    }
    server {
        listen 8080;
        root /data/up1;

        location / {

        }
    }
}
```

No exemplo acima toda requisição que tenha um URI terminado com `.png`, `.jpg`
ou `.gif` sera provida com os arquivos da pasta `/data/images`, enquanto
qualquer requisição que não atenda essa condição será enviada ao servidor que
está escutando a porta 8080 que proverá os arquivos da pasta `/data/up1`
