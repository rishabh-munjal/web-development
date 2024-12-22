// gsap.from("#box" , {
//     x:1200,
//     rotate:360 ,
//     backgroundColor:"blue",
//     duration:2,
//     delay:1
// })

//GSAP Timeline

var t1 = gsap.timeline();

t1.to("#box1", {
  x: 1410,
  rotate: 360,
  backgroundColor: "blue",
  duration: 2,
  scale: 0.5
});
t1.to("#box2", {
  x: 1410,
  rotate: 360,
  backgroundColor: "blue",
  duration: 2,
  scale: 0.5
});
t1.to("#box3", {
  x: 1410,
  rotate: 360,
  backgroundColor: "blue",
  duration: 2,
  scale: 0.5
//   stagger: 0.5 //all ements 1 by one
}); 
