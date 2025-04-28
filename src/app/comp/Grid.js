// "use client";

// import React from 'react';


// const Grid = () => {
//   return (
//     <div className="relative h-screen overflow-hidden m-2 rounded-2xl">
      
//       {/* Video Background */}
//       <div className="absolute top-0 left-0 w-full h-[500px] z-[1]">
//         <video autoPlay muted loop className="w-full h-full object-cover">
//           <source src="/manrunning.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>

//       {/* Grid Overlay */}
//       <div className="absolute top-0 left-0 w-full h-full z-[2] flex flex-col">
        
//         {/* First row */}
//         <div className="flex w-full">
//           {/* Double Box */}
//           <div className="flex-shrink-0 w-[33.46%] h-[250px] border border-white relative">
//             <div className="w-full h-full relative overflow-hidden"></div>
//           </div>

//           {/* Other 4 boxes */}
//           {[...Array(4)].map((_, index) => (
//             index === 2 ? (
//               <div key={index} className="flex-shrink-0 w-[calc((100%-33.46%)/4)] h-[250px] border border-white relative bg-white">
//                 <div className="w-full h-full relative overflow-hidden flex items-center justify-center text-center p-2 bg-white bg-opacity-50">
//                   <p className="text-black text-sm">
//                    Create fast paced Sports Journal,<br />
//                     Easy to use<br />
//                     Free premium features<br />
//                     learn more
//                   </p>
                  
//                 </div>
                
//               </div>
//             ) : (
//               <div key={index} className="flex-shrink-0 w-[calc((100%-33.46%)/4)] h-[250px] border border-white relative">
//                 <div className="w-full h-full relative overflow-hidden"></div>
//               </div>
//             )
//           ))}
//         </div>

//         {/* Second row */}
//         <div className="flex w-full">
//           {[...Array(6)].map((_, index) => (
//             (index === 0 || index === 5) ? (
//               <div key={index} className="flex-shrink-0 w-1/6 h-[250px] border border-white relative bg-white">
//                 <div className="w-full h-full relative overflow-hidden flex items-center justify-center"></div>
//               </div>
//             ) : (
//               <div key={index} className="flex-shrink-0 w-1/6 h-[250px] border border-white relative">
//                 <div className="w-full h-full relative overflow-hidden"></div>
//               </div>
//             )
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Grid;
