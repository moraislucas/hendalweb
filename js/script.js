import ScrollAnima from './modules/scroll-anima.js';

const scrollAnima = new ScrollAnima('[data-anime]');
scrollAnima.init();

if (window.SimpleForm) {
  // Para Formulario de contatos
  new SimpleForm({
    form: ".formphp",
    button: "#enviar",
    erro: "<div id='form-erro'><div class='mensagem-submit'><h2>erro ao enviar!</h2><p>Um erro ocorreu, tente para o email contatohendal@gmail.com</p></div></div>",
    sucesso: "<div id='form-sucesso'><div class='mensagem-submit'><h2>dados enviados com sucesso!</h2><p>Em breve entraremos em contato, abraços.</p> </div></div>"
  });
}


function initModal(modalId, btnId) {
  const modal = document.getElementById(modalId);
  const btn = document.querySelectorAll(btnId);

  if (modal && btn) {
    modal.addEventListener('click', (e) => {
      if (e.target.id == modalId || e.target.id == 'fechar')
        modal.classList.remove('mostrar');
    })

    btn.forEach(btn => {
      btn.addEventListener('click', handleClick);
    });

    function handleClick(event) {
      event.preventDefault();
      modal.classList.add('mostrar');
    }

    window.addEventListener('keyup', (e) => {
      if (e.key == 'Escape')
        modal.classList.remove('mostrar')
    });
  }

}
// initModal('modal-form', '.btn-form');

function initSteps() {
  const btnStep = document.querySelectorAll('.btn-step');
  const contentStep = document.querySelectorAll('.step');

  if (btnStep.length && contentStep.length) {
    contentStep[0].classList.add('ativo');

    function removeClass() {
      contentStep.forEach((item, index) => {
        item.classList.remove('ativo');
        btnStep[index].classList.remove('ativo');
      });
    }

    function activeTab(index) {
      removeClass();
      contentStep[index].classList.add('ativo');
      btnStep[index].classList.add('ativo');
    }


    function animar(seletor, novoSeletor) {
      let atual = document.querySelector(seletor);
      if (atual) {
        let proximo = '';
        if (atual.classList.contains('btn-step')) {
          if (atual.parentElement.nextElementSibling) {
            proximo = atual.parentElement.nextElementSibling.querySelector('a')
          } else {
            proximo = btnStep[0];
          }
        } else {
          proximo = atual.nextElementSibling
        }

        if (proximo === null) {
          if (atual.classList.contains('step')) {
            proximo = atual.parentElement.querySelector(novoSeletor);
          }
        }
        atual.classList.remove('ativo');
        proximo.classList.add('ativo');
      }
    }

    setInterval(() => {
      animar('.step.ativo', 'div');
      animar('.btn-step.ativo', 'a');
    }, 9000);
    btnStep.forEach((btn, index) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        activeTab(index);
      });
    });
  }

}

initSteps();


function initMobile() {
  const btn = document.querySelector('.btn-mobile');
  const menuMobile = document.querySelector('.menu nav');
  const links = document.querySelectorAll('a[href^="#"]');

  if (btn && menuMobile && links.length) {
    links.forEach(link => {
      link.addEventListener('click', () => {
        btn.classList.remove('ativo');
        menuMobile.classList.remove('ativo');
      })
    })
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('ativo');
      menuMobile.classList.toggle('ativo');
    })
  }

}
initMobile();