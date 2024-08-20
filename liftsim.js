const urlParams = new URLSearchParams(window.location.search);
const Numberof_FLoors = parseInt(urlParams.get('nooffloors'));
const numberof_Lifts = parseInt(urlParams.get('nol'));
console.log("Number of lifts : "+numberof_Lifts);

class Floor {
    constructor(floorNumber) {
      this.floorNumber = floorNumber;
      this.lift = null; 
     
    }
  }
  

  class Lift {
    constructor(liftId,liftElement) {
      this.liftId = liftId;
      this.currentFloor = null; 
      this.direction=null;
      this.element = liftElement;
    }
    moveToFloor(assignedLift,floorNumber) {
      console.log("Move to floor assigned lift is : " + assignedLift);
      console.log("Assigned lift floor " + assignedLift.currentFloor);
      const liftElement = assignedLift.element;
      const containerHeight = document.getElementById("mainpagediv").clientHeight; 
      const floorElement = document.querySelector('.subelements'); 
      const floorHeight = floorElement.clientHeight; 
      const floorMargin = parseInt(window.getComputedStyle(floorElement).marginBottom); 
      
      const totalFloorHeight = floorHeight + floorMargin;
      const transformVal = floorNumber * totalFloorHeight; 
      
      liftElement.style.transform = `translateY(-${transformVal}px)`; 
    
      }
    
    openDoors(assignedLift) {
        setTimeout(() => {
          console.log("Assigned lift is : "+assignedLift);
        const liftElement = assignedLift.element;
        console.log("Elemnent value is : "+liftElement);
        console.log("Lift floor in openDoors is : "+assignedLift.currentFloor);
    const leftDoor = liftElement.querySelector('.lift-door-left');
    const rightDoor = liftElement.querySelector('.lift-door-right');
  
    leftDoor.style.transform = 'translateX(-100%)';
    rightDoor.style.transform = 'translateX(100%)';

    setTimeout(function(){
        leftDoor.style.transform = 'translateX(0%)';
        rightDoor.style.transform = 'translateX(0%)';
    
    },1500)
        }, 2600);
     
    console.log("Checking lift animation working");
      }

     opendooranim(assignedLift,floorNumber)
      {
        console.log("Assigned lift is : "+assignedLift);
        const liftElement = assignedLift.element;
        console.log("Elemnent value is : "+liftElement);
        console.log("Lift floor in openDoors is : "+assignedLift.currentFloor);
    const leftDoor = liftElement.querySelector('.lift-door-left');
    const rightDoor = liftElement.querySelector('.lift-door-right');
    leftDoor.style.transform = 'translateX(-100%)';
    rightDoor.style.transform = 'translateX(100%)';

    setTimeout(function(){
        leftDoor.style.transform = 'translateX(0%)';
        rightDoor.style.transform = 'translateX(0%)';
    
    },1500)
      }
  }  
const floors = [];
const lifts = [];


for(var i=Numberof_FLoors;i>=0;i--){
  if(i==Numberof_FLoors)
  {
    const newdiv=document.createElement("div");
    
    newdiv.className=`subelements`;
    newdiv.innerHTML=`
        <div class="floorname">Floor ${i}</div>
        <div class="buttons">
            <button class="downbutton" onclick="assignLiftToFloor(${i})">↓</button>
        </div>
    `
    floors[i]=new Floor(i);
    document.getElementById("mainpagediv").appendChild(newdiv);
  }
  else if(i==0)
  {
    const newdiv=document.createElement("div");
    
    newdiv.className=`subelements`;
    newdiv.innerHTML=`
        <div class="floorname">Floor ${i}</div>
        <div class="buttons">
            <button class="upbutton" onclick="assignLiftToFloor(${i})">↑</button> <br>
           
        </div>
    `
    for(var j=1;j<=numberof_Lifts;j++)
      {
          const liftdiv=document.createElement("div");
          const liftdoorleft=document.createElement("div");
          const liftdoorright=document.createElement("div");
          liftdiv.className="lift";
          liftdiv.id=`lift${i}`
          liftdoorleft.className="lift-door-left";
          liftdoorright.className="lift-door-right";
          liftdiv.appendChild(liftdoorleft);
          liftdiv.appendChild(liftdoorright);
          newdiv.appendChild(liftdiv);
          lifts.push(new Lift(`lift${i}`,liftdiv));
      }
    floors[i]=new Floor(i);
    document.getElementById("mainpagediv").appendChild(newdiv);
  }
  else{
    const newdiv=document.createElement("div");
    
    newdiv.className=`subelements`;
    newdiv.innerHTML=`
        <div class="floorname">Floor ${i}</div>
        <div class="buttons">
            <button class="upbutton" onclick="assignLiftToFloor(${i},'up')">↑</button> <br>
            <button class="downbutton" onclick="assignLiftToFloor(${i},'down')">↓</button>
        </div>
    `
      
    floors[i]=new Floor(i);
    document.getElementById("mainpagediv").appendChild(newdiv);
  }
}

console.log("Floors array val : "+floors[Numberof_FLoors].floorNumber);
    
   // document.getElementById("mainpagediv").appendChild(floor0);

function assignLiftToFloor(floorNumber,buttondirection) {
    console.log("Floor number is : "+floorNumber);
    let AvailableLift = lifts.find(lift => 
      lift.currentFloor === floorNumber && lift.direction === buttondirection
  );
    if(AvailableLift)
    {console.log("inside the lift open door animation only")
      console.log("Lift direction is : "+AvailableLift.direction);
      console.log("Button direction is : "+buttondirection);
      opendoorsonly(floorNumber,buttondirection)
    }
    else {
      var availableLift = lifts.find(lift => lift.currentFloor === null)
    if (availableLift) {
      console.log("Inside the available lift if part");
      availableLift.currentFloor = floorNumber;
      availableLift.direction=buttondirection;
      floors[floorNumber].lift = availableLift;
      console.log( "Floor number lift is : "+floors[floorNumber].floorNumber)
      openliftdoor(floorNumber) 
    } 
    else {
      console.log("Inside the else part of link door with lift")
      let nearestLiftDistance = Infinity;
      let nearestLift;
  
      for (const lift of lifts) {
        if (lift.currentFloor !== null) {
          const distance = Math.abs(lift.currentFloor - floorNumber);
          if (distance < nearestLiftDistance) {
            nearestLiftDistance = distance;
            nearestLift = lift;
          }
        }
      }
  
      if (nearestLift) {
        availableLift = nearestLift; 
        availableLift.currentFloor = floorNumber;
       // availableLift.direction=buttondirection;
        floors[floorNumber].lift = availableLift;
        openliftdoor(floorNumber);
      }
    }
  
    }
   
  }
function openliftdoor(floorNumber){
    
    const assignedLift = floors[floorNumber].lift; 
    console.log(floors)
    console.log(lifts)
    console.log("Assigned lift is :"+assignedLift);
    console.log("Assigned lift element in openliftdoor function is : "+assignedLift.element);
    if (assignedLift) {
    assignedLift.moveToFloor(assignedLift,floorNumber);
    assignedLift.openDoors(assignedLift); 
  } else {
    console.log("No lift assigned to floor", floorNumber);
  }
   
}

function opendoorsonly(floorNumber,buttondirection)
{
  const assignedLift = floors[floorNumber].lift;
  if (assignedLift) {
    assignedLift.opendooranim(assignedLift,floorNumber);
  }
}