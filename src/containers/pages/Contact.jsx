import { useEffect, useRef } from 'react';

import Layout from '../../hocs/Layout';

// import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faStreetView,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

import {
  regularExpressionsForm,
  validarCampo,
  validateEmpty,
} from '../../helpers/functions';

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const inputNombre = useRef('');
  const inputCorreo = useRef('');
  const inputAsunto = useRef('');
  const inputMensaje = useRef('');

  // function validateForm(){
  //     // console.log(inputNombre.current.value)
  //     validateEmpty(inputNombre);
  //     validateEmpty(inputEmail);
  //     validateEmpty(inputAsunto);
  //     validateEmpty(inputMensaje);
  // }

  const form = useRef();

  // const sendEmail = (e) => {
  //     e.preventDefault();

  //     emailjs.sendForm('service_ye8zlok', 'template_99152ao', form.current, 'X6DkMH6F8azXG4zS7') //('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
  //         .then((result) => {
  //             console.log(result.text);
  //         }, (error) => {
  //             console.log(error.text);
  //         });
  // };

  function validarFormulario(e) {
    switch (e.target.name) {
      case 'nombre':
        validarCampo(regularExpressionsForm.nombre, inputNombre, 'nombre');
        break;
      case 'correo':
        validarCampo(regularExpressionsForm.correo, inputCorreo, 'correo');
        break;
      case 'asunto':
        //Vacio?
        break;
      case 'mensaje':
        //Vacio?
        break;
      default:
        throw new Error('Error! Validadar formulario tipo erroneo');
    }
  }

  return (
    <Layout>
      <div className="seccionContacto">
        <h2>Contacto</h2>
        <h3>INFORMANOS SOBRE NUEVAS IDEAS O ERRORES</h3>
        <div className="seccionContacto__contenedorInfo">
          <div className="seccionContacto__contenedorInfo__bloque">
            <div className="seccionContacto__contenedorInfo__bloque--icono"></div>
            <div className="seccionContacto__contenedorInfo__bloque--info">
              <h4>
                <FontAwesomeIcon icon={faStreetView} /> Direccion
              </h4>
              <p>Madrid, España</p>
            </div>
          </div>
          <div className="seccionContacto__contenedorInfo__bloque">
            <div className="seccionContacto__contenedorInfo__bloque--icono"></div>
            <div className="seccionContacto__contenedorInfo__bloque--info">
              <h4>
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </h4>
              <p>techcomponents@example.com</p>
            </div>
          </div>
          <div className="seccionContacto__contenedorInfo__bloque">
            <div className="seccionContacto__contenedorInfo__bloque--icono"></div>
            <div className="seccionContacto__contenedorInfo__bloque--info">
              <h4>
                <FontAwesomeIcon icon={faPhone} /> Teléfono
              </h4>
              <p>+34 666 66 66 66</p>
            </div>
          </div>
        </div>
        {/* <form className="seccionContacto__contenedorFormulario" ref={form} onSubmit={sendEmail}> */}
        <form className="seccionContacto__contenedorFormulario" ref={form}>
          <div className="seccionContacto__contenedorFormulario__contenedorInputs">
            <div className="seccionContacto__contenedorFormulario__contenedorInputs__contenedorIzq">
              <div
                className="seccionContacto__contenedorFormulario__contenedorInputs__contenedorIzq--contenedor"
                id="grupo__nombre"
              >
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  ref={inputNombre}
                  onChange={validarFormulario}
                />
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="icon_validacion"
                />
                <p className="infoError">
                  No se permiten caracteres especiales y números.
                </p>
              </div>
              <div
                className="seccionContacto__contenedorFormulario__contenedorInputs__contenedorIzq--contenedor"
                id="grupo__correo"
              >
                <label>Email</label>
                <input
                  type="email"
                  name="correo"
                  ref={inputCorreo}
                  onChange={validarFormulario}
                />
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="icon_validacion"
                />
                {/* <p className="infoError">El correo solo puede contener letras, números, puntos, guiones y aguión bajo.</p> */}
                <p className="infoError">El correo introducido no es válido.</p>
              </div>
              <div
                className="seccionContacto__contenedorFormulario__contenedorInputs__contenedorIzq--contenedor"
                id="grupo__asunto"
              >
                <label>Asunto</label>
                <input
                  type="text"
                  name="asunto"
                  ref={inputAsunto}
                  onChange={validarFormulario}
                />
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="icon_validacion"
                />
                <p className="infoError">Error asunto.</p>
              </div>
            </div>
            <div
              className="seccionContacto__contenedorFormulario__contenedorInputs__contenedorDer"
              id="grupo__mensaje"
            >
              <label>Mensaje</label>
              <textarea
                name="mensaje"
                ref={inputMensaje}
                onChange={validarFormulario}
              />
              <p className="infoError">El texto no puede estar vacio.</p>
            </div>
          </div>
          <input
            type="submit"
            className="seccionContacto__contenedorFormulario--boton"
            value="Enviar"
          />
          {/* <input type="submit" className="seccionContacto__contenedorFormulario--boton" value="Enviar" onClick={validateForm} /> */}
        </form>
        <hr />

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194347.89542910652!2d-3.67953665!3d40.4379543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid!5e0!3m2!1sen!2ses!4v1664571259830!5m2!1sen!2ses"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="googleMaps"
          className="seccionContacto__googleMap"
        />
      </div>
    </Layout>
  );
}

export default Contact;
