import { Parallax } from 'react-parallax';
import ForgottenAsylum from './ForgottenInfo';
import CryzoneX from './CryzoneInfo';
import Inferno from './InfernoInfo'
import Tampet from './TampetInfo';
import Pharoah from './PharoahInfo';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
function Info(){
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,    
    });
  }, []);

    return (
        <div>
          <section id='infoF' data-aos="fade-up">
            <Parallax strength={400}>
              <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
                <ForgottenAsylum />
              </div>
            </Parallax>
          </section>

          <section id='infoC' data-aos="fade-up">
            <Parallax strength={400}>
              <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
                <CryzoneX />
              </div>
            </Parallax>
          </section>

          <section id='infoI' data-aos="fade-up">
            <Parallax strength={400}>
              <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
                <Inferno />
              </div>
            </Parallax>
          </section>

          <section id='infoT' data-aos="fade-up">
            <Parallax strength={400}>
              <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
                <Tampet />
              </div>
            </Parallax>
          </section>

          <section id='infoP' data-aos="fade-up">
            <Parallax strength={400}>
              <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
                <Pharoah />
              </div>
            </Parallax>
          </section>

        </div>
      );
}
export default Info;
