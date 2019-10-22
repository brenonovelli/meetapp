# Envios de e-mails
Envios de e-mails usando template engines e filas (background-jobs).

## **Bibliotecas**

* **Nodemailer**  
  Lib para envios de e-mails com o NodeJS  
  ```
  yarn add nodemailer
  ```

* **Express Handlebars** | [Documentação](https://www.npmjs.com/package/express-handlebars)  
  Lib para lidar com template engines com o express   
  ```
  yarn add express-handlebars
  ```  

* **Express Handlebars plugin for Nodemailer** | [Documentação](https://www.npmjs.com/package/nodemailer-express-handlebars)  
Integrando Nodemailer com a lib Expresses Handlebars  
  ```
  yarn add nodemailer-express-handlebars
  ```

---

## **Serviços de envio de e-mail**
* [Amazon SES](https://aws.amazon.com/pt/ses/)
* [Mailgun](https://www.mailgun.com/)
* [Sparkpost](https://www.sparkpost.com/)
* [Mandril](https://mandrill.com/) - Uso com o Mailchimp
* [Mailtrap](https://mailtrap.io/) - Apenas para ambiente de desenvolvimento

---

## **Steps**
1. Criar uma arquivo de configuração mail.js com os dados de stmp
  ```js
  export default {
    host: '',
    port: '',
    secure: false,
    auth: {
      user: '',
      pass: '',
    },
    default: {
      from: 'Remetente <noreply@site.com>',
    },
  };
  ```

2. Criar um novo arquivo para configurações adicionais.     
  _Sugestão: `src/lib/Mail.js`_   
          
3. Importar `nodemailer` e config `mail.js`
  ```js
  import nodemailer from 'nodemailer';
  import mailConfig from '../config/mail';
  ```

4. Criar uma `class Mail`
```js
class Mail{
  constructor(){

  }
}
export default new Mail();
```

5. Definir a variável `transporter` que é como o Nodemailer chama uma conexão com algum serviço externo para mandar e-mail.
  ```js
  class Mail{
    constructor(){
      this.transporter = nodemailer.createTransport({});
    }
  }
  export default new Mail();
  ```

6. Desestruturar o mailConfig e alimentar o `createTransport`. Uma verificação será feito no `auth` para ter certeza se está sendo passado.
  ```js
  class Mail{
    constructor(){
      const { host, port, secure, auth }  = mailConfig;
      
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: auth.user ? auth : null,
      });
    }
  }
  export default new Mail();
  ```

7. Criar o método `sendMail` dentro desse arquivo para poder juntar as definições setadas por padrão no `mail config` com as informações enviadas pelo `mailController`. Por exemplo: remetente é setado com um valor padrão  no `mail config` e a mensagem virá dinâmica do `mailController`.
  ```js
  class Mail{
    constructor(){
      const { host, port, secure, auth }  = mailConfig;
      
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: auth.user ? auth : null,
      });
    }
    sendMail(message) {
      return this.transporter.sendMail({
        ...mailConfig.default,
        ...message,
      })
    }     
  }
  export default new Mail();
  ```

8. O e-mail já está pronto para ser enviado. Vamos montar a chamada para o envio dentro do controller desejado.
  ```js
  import Mail from '../../lib/Mail'
  ```

  ```js
  await Mail.sendMail({
    to: 'Nome <email@email.com>',
    subject: '',
    text: '',
  })

  return;
  ```

9. **Enviou? Tudo certo?** Vamos melhorar o e-mail então com html, css, variáveis. Hora de template engine. Hora do Handlebars brilhar.

10. De volta ao `lib/Mail.js`, vamos importar mais algumas bibliotecas.
  ```js
  import { resolve } from 'path';
  /* Resolve para indicar onde estão os templates de e-mail. */
  import exphbs from 'express-handlebars';
  /* Integra handlebars ao express. */
  import nodemailerhbs from 'nodemailer-express-handlebars';
  /* Integra o nodemailer à biblioteca acima. */
  ```

  ```js
  import nodemailer from 'nodemailer';
  import { resolve } from 'path';
  import exphbs from 'express-handlebars';
  import nodemailerhbs from 'nodemailer-express-handlebars';
  import mailConfig from '../config/mail';
  ```

11. Vamos criar o método `configureTemplates` dentro da classe `Mail`.
  ```js
  configureTemplates(){
    const viewPath = resolve(__dirname, '..','app', 'views', 'emails' );

    this.transporter.use('compile', nodemmailerhbs({
      viewEngine: exphbs.create({
        layoutsDir: resolve(viewPath, 'layouts'),
        partialsDir: resolve(viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs'
      }),
      viewPath,
      extName: '.hbs',
    }));
  }
  ```

12. Dentro de `constructor` vamos chamar o método `configureTemplates`.
  ```js
  class Mail{
    constructor(){
      const { host, port, secure, auth }  = mailConfig;
      
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: auth.user ? auth : null,
      });

      this.configureTemplates();
    }
  }
  export default new Mail();
  ```

  
13. Hora de começar a produzir os layouts dos e-mails.
Primeiro crieremos uma pasta para armezanar os templates.
  ```
  mkdir src/views/emails
  ```
  Dentro dessa pasta criaremos uma pasta que conterá os `partials`. Serão partes de template que poderão ser incluídas dentro de outros layout. Por exemplo: cabeçaoe rodapé.
  ```
  mkdir src/views/emails/partials
  ```
  Também criaremos a pasta para armezanar os layouts.
  ```
  mkdir src/views/emails/layouts
  ```
  Vamos começar a criar pela pasta layout. Dentro dela vamos criar o template default. O mesmo que indicamos no item 11. `defaultLayout: 'default',`
  ```
  touch src/views/emails/layouts/default.hbs
  ```
  Esses arquivos recebem conteúdo html e variáves. No exemplo abaixo `{{{ body }}}` será o local que receberá o conteúdo do e-mail do _controller_ e `{{> footer }`} receberá a _partial_ footer.
  ```html
    <div>
      {{{ body }}}
      {{> footer }}
    </div>
  ```
  Falta criar o _partial_ footer.
  ```
  touch src/views/emails/partials/footer.hbs
  ```
  ```html
  <div>
    Obrigado pelo contato. Retornameremos em breve.<br />
    Equipe Empresa Mais
  </div>
  ```
  Para fechar temos que definir como será o layout do conteúdo.
  ```
  touch src/views/emails/your-controller.hbs
  ```
  Neste exemplo esperamos receber conteúdo para três variáves: `usuario, local e date`. O controller providenciará isso. Falaremos no próximo item.
  ```html
  <strong>Olá, {{ usuario }}</strong>
  <p>Sua reserva já foi registrada. Em breve você receberá seu voucher.</p>
  <p>
    <strong>Local: </strong> {{ local }}<br />
    <strong>Data: {{ date }}</strong><br />
  </p>

  ```

14. Voltando ao `controller` que disparará o e-mail, teremos que alterar o `sendMail`. Sairá `text` e entrará `template` indicando qual template será usado e context para mandar o conteúdo que alimentará as variáveis.
  ```js
  await Mail.sendMail({
    to: 'Nome <email@email.com>',
    subject: '',
    template: 'your-controller',
    context: {
      usuario:'',
      local: '',
      date:'',
    }
  })

  return;
  ```

