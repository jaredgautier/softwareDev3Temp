console.log("Starting");
 //setTimeout(callback, duration) is an asynchronous version of sleep
 setTimeout(() => {
 console.log("Done Waiting");
 }, 10000);
 console.log("Done, doing other things");
 for (let i = 0; i < 10; i++) {
 console.log(i);

 }
 console.log("Done with other things");
