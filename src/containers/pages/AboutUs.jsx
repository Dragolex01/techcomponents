import Layout from '../../hocs/Layout';

import imgAboutUs from '../../img/imgAboutUs2.jpg';
import imgAboutUs2 from '../../img/imgAboutUs4.jpg';
import imgAboutUs3 from '../../img/imgAboutUs3.jpg';


function AboutUs(){
    return (
        <Layout>
            <div className="seccionInformacion">
                <h2>Sobre nosotros</h2>
                <div className="titleDivider" />
                <div className="seccionInformacion__contInfo">
                    <div className="seccionInformacion__contInfo--img">
                        <img src={imgAboutUs} alt="imgAboutUs" />
                    </div>
                    <div className="seccionInformacion__contInfo--info">
                        <h3>¿QUIÉNES SOMOS?</h3>
                        <p>Est eiusmod cupidatat ut sunt eiusmod. Minim velit Lorem id nulla velit dolore mollit exercitation quis. Pariatur dolore laboris est laboris proident enim laboris consectetur veniam enim cillum quis. Sint nostrud sint duis aute aute ea occaecat in aute officia est aliquip labore laboris. Mollit mollit anim mollit mollit nulla magna non. Sit enim sunt id pariatur aliqua labore incididunt.</p>
                    </div>
                </div>
                <div className="seccionInformacion__contInfo">
                    <div className="seccionInformacion__contInfo--info">
                        <h3>¿CON QUE MARCAS TRABAJAMOS?</h3>
                        <p>Est eiusmod cupidatat ut sunt eiusmod. Minim velit Lorem id nulla velit dolore mollit exercitation quis. Pariatur dolore laboris est laboris proident enim laboris consectetur veniam enim cillum quis. Sint nostrud sint duis aute aute ea occaecat in aute officia est aliquip labore laboris. Mollit mollit anim mollit mollit nulla magna non. Sit enim sunt id pariatur aliqua labore incididunt.</p>
                    </div>
                    <div className="seccionInformacion__contInfo--img">
                        <img src={imgAboutUs2} alt="imgAboutUs" />
                    </div>
                </div>
                <div className="seccionInformacion__contInfo">
                    <div className="seccionInformacion__contInfo--img">
                        <img src={imgAboutUs3} alt="imgAboutUs" />
                    </div>
                    <div className="seccionInformacion__contInfo--info">
                        <h3>¿LOREM LOREM?</h3>
                        <p>Est eiusmod cupidatat ut sunt eiusmod. Minim velit Lorem id nulla velit dolore mollit exercitation quis. Pariatur dolore laboris est laboris proident enim laboris consectetur veniam enim cillum quis. Sint nostrud sint duis aute aute ea occaecat in aute officia est aliquip labore laboris. Mollit mollit anim mollit mollit nulla magna non. Sit enim sunt id pariatur aliqua labore incididunt.</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AboutUs;