import { Parallax } from 'react-parallax';
function Info(){
    return (
        <div>
          <Parallax bgImage="/pictures/forgotten.png" strength={400}>
            <div style={{ height: '100vh' }}>
             <div className="d-flex h-100 justify-content-center align-items-center text-white bg-dark bg-opacity-50">
               <h1>The Forgotten Asylum</h1>
                </div>
             </div>
           </Parallax>
           <div style={{ height: '40px', backgroundColor: '#fff' }}></div>
           <Parallax bgImage="/pictures/cryzone.png" strength={400}>
            <div style={{ height: '100vh' }}>
             <div className="d-flex h-100 justify-content-center align-items-center text-white bg-dark bg-opacity-50">
               <h1>Cryzone X</h1>
                </div>
             </div>
           </Parallax>
           <div style={{ height: '40px', backgroundColor: '#fff' }}></div>
           <Parallax bgImage="/pictures/inferno.png" strength={400}>
            <div style={{ height: '100vh' }}>
             <div className="d-flex h-100 justify-content-center align-items-center text-white bg-dark bg-opacity-50">
               <h1>Inferno Spiral</h1>
                </div>
             </div>
           </Parallax>
           <div style={{ height: '40px', backgroundColor: '#fff' }}></div>   
           <Parallax bgImage="/pictures/pharoah.png" strength={400}>
            <div style={{ height: '100vh' }}>
             <div className="d-flex h-100 justify-content-center align-items-center text-white bg-dark bg-opacity-50">
               <h1>Pharaoh’s Curse</h1>
                </div>
             </div>
           </Parallax>
           <div style={{ height: '40px', backgroundColor: '#fff' }}></div>
           <Parallax bgImage="/pictures/tampet.png" strength={400}>
            <div style={{ height: '100vh' }}>
             <div className="d-flex h-100 justify-content-center align-items-center text-white bg-dark bg-opacity-50">
               <h1>The Tampet Wrath</h1>
                </div>
             </div>
           </Parallax>
    
        </div>
      );
}
export default Info;
