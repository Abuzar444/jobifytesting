import React from 'react';
import mainAlternative from '../assets/images/main-alternative.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const Landing = () => {
  const { user } = useAppContext();

  return (
    <>
      {user && <Navigate to='/' />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className='container page'>
          {/* info */}
          <div className='info'>
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione
              corporis, quas accusamus veritatis delectus possimus, dolor atque
              ut et, numquam non! Quos pariatur adipisci deleniti quo quaerat
              ipsam vel suscipit tenetur quisquam quod, sapiente quae natus
              beatae porro, numquam eius culpa delectus minima omnis dolore
              similique exercitationem! Natus, aliquam modi?
            </p>
            {/* <button className='btn btn-hero'>Login/Register</button> */}
            <Link to='/register' className='btn btn-hero'>
              Login
            </Link>
          </div>
          {/* main image */}
          <img className='img main-img' src={mainAlternative} alt='job hunt' />
        </div>
      </Wrapper>
    </>
  );
};

export default Landing;

// Before Refactor
// const Landing = () => {
//   return (
//     <Wrapper>
//       <nav>
//         <Logo />
//       </nav>
//       <div className='container page'>
//         {/* info */}
//         <div className='info'>
//           <h1>
//             job <span>tracking</span> app
//           </h1>
//           <p>
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione
//             corporis, quas accusamus veritatis delectus possimus, dolor atque ut
//             et, numquam non! Quos pariatur adipisci deleniti quo quaerat ipsam
//             vel suscipit tenetur quisquam quod, sapiente quae natus beatae
//             porro, numquam eius culpa delectus minima omnis dolore similique
//             exercitationem! Natus, aliquam modi?
//           </p>
//           {/* <button className='btn btn-hero'>Login/Register</button> */}
//           <Link to='/register' className='btn btn-hero'>
//             Login
//           </Link>
//         </div>
//         {/* main image */}
//         <img className='img main-img' src={mainAlternative} alt='job hunt' />
//       </div>
//     </Wrapper>
//   );
// };
