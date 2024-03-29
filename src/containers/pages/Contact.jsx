import { useEffect, useState, useRef } from 'react';

import Layout from '../../hocs/Layout';

import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faStreetView} from '@fortawesome/free-solid-svg-icons';
import ClipLoader from 'react-spinners/ClipLoader';

import { regularExpressionsForm, validateInput, validateEmpty } from '../../helpers/functions';

function Contact() {

  const form = useRef();
  const [emailStatus, setEmailStatus] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const inputName = useRef('');
  const inputEmail = useRef('');
  const inputSubject = useRef('');
  const inputMessage = useRef('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Enviar email
  const sendEmail = (e) => {
    e.preventDefault();

    setLoading(true)
    emailjs.sendForm('service_ye8zlok', 'template_99152ao', form.current, 'X6DkMH6F8azXG4zS7') //('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
        .then((result) => {
            setLoading(false)
            setEmailStatus(true)
        }, (error) => {
            setLoading(false)
            setEmailStatus(false)
        });
  };

  // Validar campo vacio
  function validateIsEmpty(){
    validateEmpty(inputName.current.value, 'name');
    validateEmpty(inputEmail.current.value, 'email');
    validateEmpty(inputSubject.current.value, 'subject');
    validateEmpty(inputMessage.current.value, 'message');
  }

  //Validar campos formulario
  function validateForm(name) {
    switch (name) {
      case 'name':
        validateInput(regularExpressionsForm.name, inputName.current.value, name);
        break;

      case 'email':
        validateInput(regularExpressionsForm.email, inputEmail.current.value, name);
        break;

      case 'subject':
        validateEmpty(inputSubject.current.value, name);
        break;

      case 'message':
        validateEmpty(inputMessage.current.value, name);
        break;
        
      default:
        throw new Error('Error! Validadar formulario tipo erroneo');
    }
  }

  return (
    <Layout>
      <div className="seccionContacto">
        <h2>Contacto</h2>
        <div className="titleDivider" />
        <h3>INFORMANOS SOBRE NUEVAS IDEAS O ERRORES</h3>
        <div className="seccionContacto__contInfo">
          <div className="seccionContacto__contInfo__bloque">
            <div className="seccionContacto__contInfo__bloque__info">
              <div className="seccionContacto__contInfo__bloque__info--icono">
                <FontAwesomeIcon icon={faStreetView} />
              </div>
              <div className="seccionContacto__contInfo__bloque__info--texto">
                <h4>Direccion</h4>
                <p>Madrid, España</p>
              </div>
            </div>
          </div>
          <div className="seccionContacto__contInfo__bloque">
            <div className="seccionContacto__contInfo__bloque__info">
              <div className="seccionContacto__contInfo__bloque__info--icono">
              <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="seccionContacto__contInfo__bloque__info--texto">
                <h4>Email</h4>
                <p>techcomponents@example.com</p>
              </div>
            </div>
          </div>
          <div className="seccionContacto__contInfo__bloque">
            <div className="seccionContacto__contInfo__bloque__info">
              <div className="seccionContacto__contInfo__bloque__info--icono">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className="seccionContacto__contInfo__bloque__info--texto">
                <h4>Teléfono</h4>
                <p>+34 666 66 66 66</p>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={sendEmail} ref={form} className="seccionContacto__contFormulario">
          <div className="seccionContacto__contFormulario__contInputs">
            <div className="seccionContacto__contFormulario__contInputs__contIzq">
              <div className="seccionContacto__contFormulario__contInputs__contIzq--contenedor" id="grupo__name">
                <label>Nombre</label>
                <input type="text" name="name" ref={inputName} onChange={(e) => validateForm(e.target.name)} required/>
                <p className="infoError">No se permiten caracteres especiales y números.</p>
              </div>
              <div className="seccionContacto__contFormulario__contInputs__contIzq--contenedor" id="grupo__email">
                <label>Email</label>
                <input type="email" name="email" ref={inputEmail} onChange={(e) => validateForm(e.target.name)} required/>
                <p className="infoError">El correo solo puede contener letras, números, puntos, guiones y aguión bajo.</p>
              </div>
              <div className="seccionContacto__contFormulario__contInputs__contIzq--contenedor" id="grupo__subject">
                <label>Asunto</label>
                <input type="text" name="subject" ref={inputSubject} onChange={(e) => validateForm(e.target.name)} required/>
                <p className="infoError">El asunto no puede estar vacio</p>
              </div>
            </div>
            <div className="seccionContacto__contFormulario__contInputs__contDer" id="grupo__message">
              <label>Mensaje</label>
              <textarea name="message" ref={inputMessage} onChange={(e) => validateForm(e.target.name)} required/>
              <p className="infoError">El texto no puede estar vacio.</p>
            </div>
          </div>
          {
            isLoading ? <ClipLoader color="#36d7b7" /> : null
          }
          {
            emailStatus ? <p>Mensaje enviado correctamente. Gracias!</p> : null
          }
          <button type="submit" onClick={validateIsEmpty}>Enviar</button>
        </form>
        
        <hr />

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194347.89542910652!2d-3.67953665!3d40.4379543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid!5e0!3m2!1sen!2ses!4v1664571259830!5m2!1sen!2ses"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="googleMaps"
          className="seccionContacto--googleMap"
        />
      </div>
    </Layout>
  );
}

export default Contact;
