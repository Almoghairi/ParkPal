import { Parallax } from 'react-parallax';
import ForgottenAsylum from './ForgottenInfo';
import CryzoneX from './CryzoneInfo';
import Inferno from './InfernoInfo'
import Tampet from './TampetInfo';
import Pharoah from './PharoahInfo';
function Info(){
    return (
        <div>
          <section id='infoF'>
            <Parallax strength={400}>
              <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
                <ForgottenAsylum />
              </div>
            </Parallax>
          </section>

          <section id='infoC'>
            <Parallax strength={400}>
              <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
                <CryzoneX />
              </div>
            </Parallax>
          </section>

          <section id='infoI'>
            <Parallax strength={400}>
              <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
                <Inferno />
              </div>
            </Parallax>
          </section>

          <section id='infoT'>
            <Parallax strength={400}>
              <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
                <Tampet />
              </div>
            </Parallax>
          </section>

          <section id='infoP'>
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
