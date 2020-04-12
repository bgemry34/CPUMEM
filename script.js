var allCPUInputs = []
var blocks = []
var process = []
var prevHole = ''

document.getElementById('selectProgram').addEventListener('change', ()=>{
    let selectedProgram = document.getElementById('selectProgram').value
    let programContainer =  document.getElementById('programContainer')
    if(selectedProgram == 'CPU Scheduling'){
        programContainer.innerHTML = 
        '<div class="col-md-4">'+
            '<div class="form-group">'+
                '<label>Select Algorithm:</label>'+
                '<select name="cpuAlgo" id="selectedAlgo" class="form-control">'+
                    '<option value="FCFS">FCFS</option>'+
                    '<option value="SJF">SJF</option>'+
                    '<option value="SRTF">SRTF</option>'+
                    '<option value="P-PRIO-L">P-PRIO-L</option>'+
                    '<option value="P-PRIO-H">P-PRIO-H</option>'+
                '</select>'+
                '<div class="form-group mt-2">'+
                    '<label>Number of Proccess:</label>'+
                    '<input class="form-control w-50" type="number" value="2" name="" id="numberOfInputs" min="0" >'+
                '</div>'+
                '<div class="form-group mt-2">'+
                    '<button id="cpuSubmit" class="btn btn-primary">Submit</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<table class="table">'+
            '<thead>'+
              '<tr id="tableTitle">'+
                '<th scope="col">Process Id</th>'+
                '<th scope="col">Arrival Time</th>'+
                '<th scope="col">Burst Time</th>'+
              '</tr>'+
            '</thead>'+
            '<tbody id="cputInputs">'+
            '</tbody>'+
        '</table>'+
        '<div id="computeButton">'+
        '</div>'
        document.getElementById('cpuSubmit').addEventListener('click', ()=>{
            let selectedAlgo = document.getElementById('selectedAlgo').value
            if(selectedAlgo=='FCFS'){
                let numberOfInputs = document.getElementById('numberOfInputs').value
                let inputContainer = document.getElementById('cputInputs')
                document.getElementById('tableTitle').innerHTML = 
                        '<th scope="col">Process Id</th>'+
                        '<th scope="col">Arrival Time</th>'+
                        '<th scope="col">Burst Time</th>'
        
                if(numberOfInputs == ''){
                    alert('Enter a Number')
                }else{
                    let output = ''
                    for(let i=1; i<=numberOfInputs;i++){
                        output += 
                        '<tr>'+
                        '<td>P'+i+'</td>'+
                        '<td><input type="number" value="0" name="arrivalTime" id="" class="form-control w-25 "></td>'+
                        '<td><input type="number" value="0" name="burstTime" id="" class="form-control w-25 "></td>'+
                        '</tr>'
                    }
        
                    document.getElementById('computeButton').innerHTML = '<button class="btn btn-success" id="toCompute" >Compute</button>'
                    inputContainer.innerHTML = output
        
                    document.getElementById('toCompute').addEventListener('click', async ()=>{
                    allCPUInputs = []
                    let arrivalTimes = document.getElementsByName('arrivalTime');
                    let burstTimes = document.getElementsByName('burstTime')    
                    
                    for(let i=1; i<=arrivalTimes.length; i++){
                        allCPUInputs.push   ({
                            id: 'p'+i,
                            arrivalTime:parseFloat(arrivalTimes[i-1].value),
                            burstTime:parseFloat(burstTimes[i-1].value),
                        })
                    }
        
                    allCPUInputs.sort((a,b)=>a.arrivalTime-b.arrivalTime)
                    allCPUInputs[0].exitTime = allCPUInputs[0].arrivalTime + allCPUInputs[0].burstTime
                    allCPUInputs[0].tat = allCPUInputs[0].exitTime - allCPUInputs[0].arrivalTime
                    allCPUInputs[0].wt = allCPUInputs[0].tat - allCPUInputs[0].burstTime
        
                    currentET = allCPUInputs[0].exitTime;
                    await allCPUInputs.forEach(allCPUInput=>{
                        if(allCPUInput.id != allCPUInputs[0].id){
                            if(currentET>=allCPUInput.arrivalTime){
                                allCPUInput.exitTime = currentET + allCPUInput.burstTime
                                allCPUInput.tat = allCPUInput.exitTime - allCPUInput.arrivalTime
                                allCPUInput.wt = allCPUInput.tat - allCPUInput.burstTime
                                currentET = allCPUInput.exitTime;
                            }else{
                                allCPUInput.exitTime = allCPUInput.arrivalTime + allCPUInput.burstTime
                                allCPUInput.tat = allCPUInput.exitTime - allCPUInput.arrivalTime
                                allCPUInput.wt = allCPUInput.tat - allCPUInput.burstTime
                                currentET = allCPUInput.exitTime
                            }
                        }
                    })
        
                    
        
                    document.getElementById('tableTitle').innerHTML = 
                        '<th scope="col">Process Id</th>'+
                        '<th scope="col">Arrival Time</th>'+
                        '<th scope="col">Burst Time</th>'+
                        '<th scope="col">Exit Time</th>'+
                        '<th scope="col">Turnaround Time</th>'+
                        '<th scope="col">Waiting Time</th>'
        
                        output = ''
        
                        allCPUInputs.sort((a,b)=>parseFloat(a.id.slice(1))-parseFloat(b.id.slice(1)))
                
                        let totalTAT = 0;
                        let totalWT = 0;
                        allCPUInputs.forEach(allCPUInput=>{
                            totalTAT+=allCPUInput.tat
                            totalWT+=allCPUInput.wt
                        })
                
                        allCPUInputs.forEach(allCPUInput=>{
                            output+=
                            '<tr>'+
                            '<td>'+allCPUInput.id+'</td>'+
                            '<td>'+allCPUInput.arrivalTime+'</td>'+
                            '<td>'+allCPUInput.burstTime+'</td>'+
                            '<td>'+allCPUInput.exitTime+'</td>'+
                            '<td>'+allCPUInput.tat+'</td>'+
                            '<td>'+allCPUInput.wt+'</td>'+
                            '</tr>'
                        })
        
                        output+=
                        '<tr>'+
                        '<td>ATT: '+(totalTAT/allCPUInputs.length).toFixed(2)+'</td>'+
                        '<td>AWT: '+(totalWT/allCPUInputs.length).toFixed(2)+'</td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '</tr>'
        
                        document.getElementById('cputInputs').innerHTML = output
                        document.getElementById('computeButton').innerHTML = ''
                    })
                }
            }
            //SJF
            else if(selectedAlgo=='SJF'){
                let numberOfInputs = document.getElementById('numberOfInputs').value
                let inputContainer = document.getElementById('cputInputs')
                document.getElementById('tableTitle').innerHTML = 
                        '<th scope="col">Process Id</th>'+
                        '<th scope="col">Arrival Time</th>'+
                        '<th scope="col">Burst Time</th>'
        
                if(numberOfInputs == ''){
                    alert('Enter a Number')
                }else{
                    let output = ''
                    for(let i=1; i<=numberOfInputs;i++){
                        output += 
                        '<tr>'+
                        '<td>P'+i+'</td>'+
                        '<td><input type="number" value="0" name="arrivalTime" id="" class="form-control w-25 "></td>'+
                        '<td><input type="number" value="0" name="burstTime" id="" class="form-control w-25 "></td>'+
                        '</tr>'
                    }
        
                    document.getElementById('computeButton').innerHTML = '<button class="btn btn-success" id="toCompute" >Compute</button>'
                    inputContainer.innerHTML = output
        
                    document.getElementById('toCompute').addEventListener('click', async ()=>{
                    allCPUInputs = []
                    let arrivalTimes = document.getElementsByName('arrivalTime');
                    let burstTimes = document.getElementsByName('burstTime')    
                    
                    for(let i=1; i<=arrivalTimes.length; i++){
                        allCPUInputs.push   ({
                            id: 'p'+i,
                            arrivalTime:parseFloat(arrivalTimes[i-1].value),
                            burstTime:parseFloat(burstTimes[i-1].value),
                        })
                    }
        
                    allCPUInputs.sort((a,b)=>a.arrivalTime-b.arrivalTime)
                    allCPUInputs[0].exitTime = allCPUInputs[0].arrivalTime + allCPUInputs[0].burstTime
                    allCPUInputs[0].tat = allCPUInputs[0].exitTime - allCPUInputs[0].arrivalTime
                    allCPUInputs[0].wt = allCPUInputs[0].tat - allCPUInputs[0].burstTime
        
                    currentET = allCPUInputs[0].exitTime;
                    allCPUInputs.sort((a,b)=>a.burstTime-b.burstTime)
                    allCPUInputs.forEach(allCPUInput=>{
                        if(allCPUInput.exitTime == undefined){
                            if(currentET>=allCPUInput.arrivalTime){
                                allCPUInput.exitTime = currentET + allCPUInput.burstTime
                                allCPUInput.tat = allCPUInput.exitTime - allCPUInput.arrivalTime
                                allCPUInput.wt = allCPUInput.tat - allCPUInput.burstTime
                                currentET = allCPUInput.exitTime;
                            }else{
                                allCPUInput.exitTime = allCPUInput.arrivalTime + allCPUInput.burstTime
                                allCPUInput.tat = allCPUInput.exitTime - allCPUInput.arrivalTime
                                allCPUInput.wt = allCPUInput.tat - allCPUInput.burstTime
                                currentET = allCPUInput.exitTime
                            }
                        }
                    })
        
                    
        
        
                    document.getElementById('tableTitle').innerHTML = 
                        '<th scope="col">Process Id</th>'+
                        '<th scope="col">Arrival Time</th>'+
                        '<th scope="col">Burst Time</th>'+
                        '<th scope="col">Exit Time</th>'+
                        '<th scope="col">Turnaround Time</th>'+
                        '<th scope="col">Waiting Time</th>'
        
                        output = ''
        
                        allCPUInputs.sort((a,b)=>parseFloat(a.id.slice(1))-parseFloat(b.id.slice(1)))
                
                        let totalTAT = 0;
                        let totalWT = 0;
                        allCPUInputs.forEach(allCPUInput=>{
                            totalTAT+=allCPUInput.tat
                            totalWT+=allCPUInput.wt
                        })
                
                        allCPUInputs.forEach(allCPUInput=>{
                            output+=
                            '<tr>'+
                            '<td>'+allCPUInput.id+'</td>'+
                            '<td>'+allCPUInput.arrivalTime+'</td>'+
                            '<td>'+allCPUInput.burstTime+'</td>'+
                            '<td>'+allCPUInput.exitTime+'</td>'+
                            '<td>'+allCPUInput.tat+'</td>'+
                            '<td>'+allCPUInput.wt+'</td>'+
                            '</tr>'
                        })
        
                        output+=
                        '<tr>'+
                        '<td>ATT: '+(totalTAT/allCPUInputs.length).toFixed(2)+'</td>'+
                        '<td>AWT: '+(totalWT/allCPUInputs.length).toFixed(2)+'</td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '</tr>'
        
                        document.getElementById('cputInputs').innerHTML = output
                        document.getElementById('computeButton').innerHTML = ''
                    })
                }
            }
        
            //SRTF
        
            else if(selectedAlgo=='SRTF'){
                let numberOfInputs = document.getElementById('numberOfInputs').value
                let inputContainer = document.getElementById('cputInputs')
                document.getElementById('tableTitle').innerHTML = 
                        '<th scope="col">Process Id</th>'+
                        '<th scope="col">Arrival Time</th>'+
                        '<th scope="col">Burst Time</th>'
        
                if(numberOfInputs == ''){
                    alert('Enter a Number')
                }else{
                    let output = ''
                    for(let i=1; i<=numberOfInputs;i++){
                        output += 
                        '<tr>'+
                        '<td>P'+i+'</td>'+
                        '<td><input type="number" value="0" name="arrivalTime" id="" class="form-control w-25 "></td>'+
                        '<td><input type="number" value="0" name="burstTime" id="" class="form-control w-25 "></td>'+
                        '</tr>'
                    }
        
                    document.getElementById('computeButton').innerHTML = '<button class="btn btn-success" id="toCompute" >Compute</button>'
                    inputContainer.innerHTML = output
        
                    document.getElementById('toCompute').addEventListener('click', async ()=>{
                    allCPUInputs = []
                    let arrivalTimes = document.getElementsByName('arrivalTime')
                    let burstTimes = document.getElementsByName('burstTime')
                    
                    for(let i=1; i<=arrivalTimes.length; i++){
                        allCPUInputs.push   ({
                            id: 'p'+i,
                            arrivalTime:parseFloat(arrivalTimes[i-1].value),
                            toUseBurstTime:parseFloat(burstTimes[i-1].value),
                            burstTime:parseFloat(burstTimes[i-1].value),
                        })
                    }
        
                    allCPUInputs = await allCPUInputs.sort((a,b)=>a.arrivalTime-b.arrivalTime)
                    
                    if(allCPUInputs[0].toUseBurstTime>0)
                    {
                        allCPUInputs[0].toUseBurstTime -= 1
                        allCPUInputs[0].exitTime = allCPUInputs[0].arrivalTime + 1 
                    }
                    else
                    allCPUInputs[0].exitTime = allCPUInputs[0].arrivalTime;
        
                    //current ET
                    let currentET = allCPUInputs[0].exitTime;
        
                    allCPUInputs = await allCPUInputs.sort((a,b)=>a.burstTime-b.burstTime)
                    let readyQue = []
                    readyQue = allCPUInputs.filter(allCPUInput=>{
                        if(allCPUInput.arrivalTime<=currentET && allCPUInput.toUseBurstTime>0)
                        return allCPUInput
                    })
        
                    let totalBurstToUse = allCPUInputs.map(allCPUInput=>allCPUInput.toUseBurstTime).reduce((prev, curr) => prev + curr, 0)
                    while(totalBurstToUse>0){
                        //ARRIVAL
                        readyQue = allCPUInputs.filter(allCPUInput=>{
                            if(allCPUInput.arrivalTime<=currentET && allCPUInput.toUseBurstTime>0)
                            return allCPUInput
                        })
        
                        //COMPARE
                        readyQue = await readyQue.sort((a,b)=>parseFloat(a.id.slice(1))-parseFloat(b.id.slice(1)))
                        readyQue = await readyQue.sort((a,b)=>{
                            return a.arrivalTime-b.arrivalTime
                        })
                        readyQue = await readyQue.sort((a,b)=>{
                            return a.toUseBurstTime-b.toUseBurstTime
                        })
        
                        //EXECUTE
                        if(readyQue.length>0){
                            allCPUInputs.forEach(allCPUInput=>{
                            if(allCPUInput.id == readyQue[0].id){
                                allCPUInput.toUseBurstTime -= 1
                                currentET += 1
                                allCPUInput.exitTime = currentET
                            }
                            })
                            
        
                            //CHECK KUNG UBoS NA
                            totalBurstToUse = allCPUInputs.map(allCPUInput=>allCPUInput.toUseBurstTime).reduce((prev, curr) => prev + curr, 0)
                        }
                    }
        
                    //compute TAT and AwT
                    allCPUInputs.forEach(allCPUInput=>{
                        allCPUInput.tat = allCPUInput.exitTime - allCPUInput.arrivalTime
                        allCPUInput.wt = allCPUInput.tat - allCPUInput.burstTime
                    })
        
                    document.getElementById('tableTitle').innerHTML = 
                        '<th scope="col">Process Id</th>'+
                        '<th scope="col">Arrival Time</th>'+
                        '<th scope="col">Burst Time</th>'+
                        '<th scope="col">Exit Time</th>'+
                        '<th scope="col">Turnaround Time</th>'+
                        '<th scope="col">Waiting Time</th>'
        
                        output = ''
        
                        allCPUInputs.sort((a,b)=>parseFloat(a.id.slice(1))-parseFloat(b.id.slice(1)))
                
                        let totalTAT = 0;
                        let totalWT = 0;
                        allCPUInputs.forEach(allCPUInput=>{
                            totalTAT+=allCPUInput.tat
                            totalWT+=allCPUInput.wt
                        })
                
                        allCPUInputs.forEach(allCPUInput=>{
                            output+=
                            '<tr>'+
                            '<td>'+allCPUInput.id+'</td>'+
                            '<td>'+allCPUInput.arrivalTime+'</td>'+
                            '<td>'+allCPUInput.burstTime+'</td>'+
                            '<td>'+allCPUInput.exitTime+'</td>'+
                            '<td>'+allCPUInput.tat+'</td>'+
                            '<td>'+allCPUInput.wt+'</td>'+
                            '</tr>'
                        })
        
                        output+=
                        '<tr>'+
                        '<td>ATT: '+(totalTAT/allCPUInputs.length).toFixed(2)+'</td>'+
                        '<td>AWT: '+(totalWT/allCPUInputs.length).toFixed(2)+'</td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '</tr>'
        
                        document.getElementById('cputInputs').innerHTML = output
                        document.getElementById('computeButton').innerHTML = ''
                    })
                }
        
            }
        
            //P-PRIO-L
            else if(selectedAlgo=='P-PRIO-L' || selectedAlgo=='P-PRIO-H'){
                let numberOfInputs = document.getElementById('numberOfInputs').value
                let inputContainer = document.getElementById('cputInputs')
                document.getElementById('tableTitle').innerHTML = 
                        '<th scope="col">Process Id</th>'+
                        '<th scope="col">Arrival Time</th>'+
                        '<th scope="col">Burst Time</th>'+
                        '<th scope="col">Priority</th>'
        
                if(numberOfInputs == ''){
                    alert('Enter a Number')
                }else{
                    let output = ''
                    for(let i=1; i<=numberOfInputs;i++){
                        output += 
                        '<tr>'+
                        '<td>P'+i+'</td>'+
                        '<td><input type="number" value="0" name="arrivalTime" id="" class="form-control w-25 "></td>'+
                        '<td><input type="number" value="0" name="burstTime" id="" class="form-control w-25 "></td>'+
                        '<td><input type="number" value="0" name="priority" id="" class="form-control w-25 "></td>'+
                        '</tr>'
                    }
        
                    document.getElementById('computeButton').innerHTML = '<button class="btn btn-success" id="toCompute" >Compute</button>'
                    inputContainer.innerHTML = output
        
                    document.getElementById('toCompute').addEventListener('click', async ()=>{
                    allCPUInputs = []
                    let arrivalTimes = document.getElementsByName('arrivalTime');
                    let burstTimes = document.getElementsByName('burstTime')    
                    let priority = document.getElementsByName('priority')   
                    
                    for(let i=1; i<=arrivalTimes.length; i++){
                        allCPUInputs.push({
                            id: 'p'+i,
                            arrivalTime:parseFloat(arrivalTimes[i-1].value),
                            toUseBurstTime:parseFloat(burstTimes[i-1].value),
                            burstTime:parseFloat(burstTimes[i-1].value),
                            priority:parseFloat(priority[i-1].value),
                        })
                    }
        
                    allCPUInputs = await allCPUInputs.sort((a,b)=>a.arrivalTime-b.arrivalTime)
                    
                    if(allCPUInputs[0].toUseBurstTime>0)
                    {
                        allCPUInputs[0].toUseBurstTime -= 1
                        allCPUInputs[0].exitTime = allCPUInputs[0].arrivalTime + 1 
                    }
                    else
                    allCPUInputs[0].exitTime = allCPUInputs[0].arrivalTime;
        
                    //current ET
                    let currentET = allCPUInputs[0].exitTime;
        
                    allCPUInputs = await allCPUInputs.sort((a,b)=>a.burstTime-b.burstTime)
                    let readyQue = []
                    readyQue = allCPUInputs.filter(allCPUInput=>{
                        if(allCPUInput.arrivalTime<=currentET && allCPUInput.toUseBurstTime>0)
                        return allCPUInput
                    })
        
                    let totalBurstToUse = allCPUInputs.map(allCPUInput=>allCPUInput.toUseBurstTime).reduce((prev, curr) => prev + curr, 0)
                    while(totalBurstToUse>0){
                        //ARRIVAL COMPARE
                        readyQue = allCPUInputs.filter(allCPUInput=>{
                            if(allCPUInput.arrivalTime<=currentET && allCPUInput.toUseBurstTime>0)
                            return allCPUInput
                        })
                        readyQue = await readyQue.sort((a,b)=>{
                            return a.arrivalTime-b.arrivalTime
                        })
        
                        if(selectedAlgo=='P-PRIO-L'){
                            readyQue = await readyQue.sort((a,b)=>{
                                return a.priority-b.priority
                            })
                        }else{
                            readyQue = await readyQue.sort((a,b)=>{
                                return b.priority-a.priority
                            })
                        }
        
                        //EXECUTE
                        if(readyQue.length>0){
                            allCPUInputs.forEach(allCPUInput=>{
                            if(allCPUInput.id == readyQue[0].id){
                                allCPUInput.toUseBurstTime -= 1
                                currentET += 1
                                allCPUInput.exitTime = currentET
                            }
                            })
                            
        
                            //CHECK KUNG UBoS NA
                            totalBurstToUse = allCPUInputs.map(allCPUInput=>allCPUInput.toUseBurstTime).reduce((prev, curr) => prev + curr, 0)
                        }
                    }
        
                    //compute TAT and AwT
                    allCPUInputs.forEach(allCPUInput=>{
                        allCPUInput.tat = allCPUInput.exitTime - allCPUInput.arrivalTime
                        allCPUInput.wt = allCPUInput.tat - allCPUInput.burstTime
                    })
        
                    document.getElementById('tableTitle').innerHTML = 
                        '<th scope="col">Process Id</th>'+
                        '<th scope="col">Arrival Time</th>'+
                        '<th scope="col">Burst Time</th>'+
                        '<th scope="col">Priority</th>'+
                        '<th scope="col">Exit Time</th>'+
                        '<th scope="col">Turnaround Time</th>'+
                        '<th scope="col">Waiting Time</th>'
        
                        output = ''
        
                        allCPUInputs.sort((a,b)=>parseFloat(a.id.slice(1))-parseFloat(b.id.slice(1)))
                
                        let totalTAT = 0;
                        let totalWT = 0;
                        allCPUInputs.forEach(allCPUInput=>{
                            totalTAT+=allCPUInput.tat
                            totalWT+=allCPUInput.wt
                        })
                
                        allCPUInputs.forEach(allCPUInput=>{
                            output+=
                            '<tr>'+
                            '<td>'+allCPUInput.id+'</td>'+
                            '<td>'+allCPUInput.arrivalTime+'</td>'+
                            '<td>'+allCPUInput.burstTime+'</td>'+
                            '<td>'+allCPUInput.priority+'</td>'+
                            '<td>'+allCPUInput.exitTime+'</td>'+
                            '<td>'+allCPUInput.tat+'</td>'+
                            '<td>'+allCPUInput.wt+'</td>'+
                            '</tr>'
                        })
        
                        output+=
                        '<tr>'+
                        '<td>ATT: '+(totalTAT/allCPUInputs.length).toFixed(2)+'</td>'+
                        '<td>AWT: '+(totalWT/allCPUInputs.length).toFixed(2)+'</td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td></td>'+
                        '</tr>'
        
                        document.getElementById('cputInputs').innerHTML = output
                        document.getElementById('computeButton').innerHTML = ''
                    
                    })
                }
        
            }
        })
        //end of CPU SCHEDULING
    }else{
        programContainer.innerHTML = 
        '<div class="col-md-4">'+
            '<div class="form-group">'+
                '<label>Select Algorithm:</label>'+
                '<select name="cpuAlgo" id="selectedAlgo" class="form-control">'+
                    '<option value="First Fit">First fit</option>'+
                    '<option value="Best fit">Best fit</option>'+
                    '<option value="Next fit">Next fit</option>'+
                    '<option value="Worst fit">Worst fit</option>'+
               '</select>'+
                '<div class="form-group mt-2">'+
                    '<label>Number of Block:</label>'+
                    '<input class="form-control w-50" type="number" value="2" name="" id="numberOfBlocks" min="0" >'+
                '</div>'+
                '<div class="form-group mt-2">'+
                    '<label>Number of Proccess:</label>'+
                    '<input class="form-control w-50" type="number" value="2" name="" id="numberOfProcess" min="0" >'+
                '</div>'+
                '<div class="form-group mt-2">'+
                    '<button id="memSubmit" class="btn btn-primary">Submit</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="col-md-12">'+
            '<div class="row">'+
                '<div class="col-md-6">'+
                    '<table class="table">'+
                        '<thead>'+
                          '<tr id="tableTitle">'+
                            '<th scope="col">Block #</th>'+
                            '<th scope="col">Size</th>'+
                          '</tr>'+
                        '</thead>'+
                        '<tbody id="blockInputs">'+
                        '</tbody>'+
                    '</table>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<table class="table">'+
                        '<thead>'+
                          '<tr id="tableTitle">'+
                            '<th scope="col">Job</th>'+
                            '<th scope="col">Arrival Time</th>'+
                            '<th scope="col" >MR</th>'+
                          '</tr>'+
                        '</thead>'+
                        '<tbody id="processInput"> '+
                        '</tbody>'+
                    '</table>'+
                '</div>'+
                '<div class="col-md-12" id="memOutput">'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div id="computeButton">'+
        '</div>'

        document.getElementById('memSubmit').addEventListener('click', ()=>{
    
            let selectedAlgo = document.getElementById('selectedAlgo').value
                
                let numberOfBlocks = document.getElementById('numberOfBlocks').value
                let numberOfProcess = document.getElementById('numberOfProcess').value
                document.getElementById('memOutput').innerHTML = ''
                blocks = []
                process = []
                
                let output = ''
                for(let i = 0; i<numberOfBlocks; i++){
                    output += 
                    '<tr>'+
                    '<td>M'+(i+1)+'</td>'+
                    '<td><input type="number" value="0" name="blocks" id="" class="form-control w-50 "></td>'+
                    '</tr>'
                }
        
                document.getElementById('blockInputs').innerHTML = output;
                output = ''
                for(let i = 0; i<numberOfProcess; i++){
                    output += 
                    '<tr>'+
                    '<td>J'+(i+1)+'</td>'+
                    '<td><input type="number" value="0" name="arrivalTime" id="" class="form-control w-50 "></td>'+
                    '<td><input type="number" value="0" name="mr" id="" class="form-control w-50 "></td>'+
                    '</tr>'
                }
        
                document.getElementById('processInput').innerHTML = output;
                document.getElementById('computeButton').innerHTML = '<button class="btn btn-success w-100 mt-2" id="toCompute" >Compute</button>'
        
                document.getElementById('toCompute').addEventListener('click', () =>{
                    prevHole = ''
                    blocks = []
                    process = []
                    let inputedBlocks = document.getElementsByName('blocks');
                    let inputedAT = document.getElementsByName('arrivalTime');    
                    let inputedMR = document.getElementsByName('mr'); 
                    
                    for(let i=1; i<=inputedBlocks.length; i++){
                        blocks.push({
                            id:i,
                            size:parseFloat(inputedBlocks[i-1].value),
                            status:'free'
                        })
                    }
        
                    for(let i=1; i<=inputedAT.length; i++){
                        process.push({
                            id:i,
                            arrivalTime:parseFloat(inputedAT[i-1].value),
                            mr: parseFloat(inputedMR[i-1].value),
                        })
                    }
                    
                    //Total User Space 
                    let totalUserSpace = 0
                    blocks.forEach(block=>totalUserSpace+=block.size)
        
                    
                    process.sort((a,b)=>a.arrivalTime - b.arrivalTime)
                    let currBlocks = blocks;
                    let memOutput = ''
                    process.forEach(async (job)=>{
                        let isPasok = false;
                        job.totalInternalFragment = 0
                        job.totalExternalFragment = 0
                        
                        if(selectedAlgo == 'First Fit'){
                            job.blockAtThisTime = currBlocks.map(currBlock=>{
                                if(currBlock.size>=job.mr && isPasok == false && currBlock.status != 'busy'){
                                    currBlock.status = 'busy'
                                    currBlock.jobNumber = job.id
                                    currBlock.jobSize = job.mr
                                    currBlock.internalFragment = currBlock.size - job.mr
                                    isPasok = true
                                }
                                return currBlock
                            })
                        }else if(selectedAlgo == 'Best fit'){
                            let lowCurrBlocks = currBlocks.map(currBlock=>currBlock).sort((a,b)=>a.size - b.size)
        
                            lowCurrBlocks.forEach(lowCurrBlock=>{
                                if(lowCurrBlock.size>=job.mr && isPasok == false && lowCurrBlock.status != 'busy'){
                                    job.blockAtThisTime = currBlocks.map(currBlock=>{
                                        if(currBlock.id == lowCurrBlock.id){
                                            currBlock.status = 'busy'
                                            currBlock.jobNumber = job.id
                                            currBlock.jobSize = job.mr
                                            currBlock.internalFragment = currBlock.size - job.mr
                                            isPasok = true
                                        }
                                        return currBlock
                                    })
                                }
                            })
                            if(!isPasok){
                                job.blockAtThisTime = currBlocks.map(currBlock=>currBlock)
                            }
                        }else if(selectedAlgo == 'Worst fit'){
                            let lowCurrBlocks = currBlocks.map(currBlock=>currBlock).sort((a,b)=>b.size - a.size)
        
                            lowCurrBlocks.forEach(lowCurrBlock=>{
                                if(lowCurrBlock.size>=job.mr && isPasok == false && lowCurrBlock.status != 'busy'){
                                    job.blockAtThisTime = currBlocks.map(currBlock=>{
                                        if(currBlock.id == lowCurrBlock.id){
                                            currBlock.status = 'busy'
                                            currBlock.jobNumber = job.id
                                            currBlock.jobSize = job.mr
                                            currBlock.internalFragment = currBlock.size - job.mr
                                            isPasok = true
                                        }
                                        return currBlock
                                    })
                                }
                            })
                            if(!isPasok){
                                job.blockAtThisTime = currBlocks.map(currBlock=>currBlock)
                            }
                        }else if(selectedAlgo == 'Next fit'){
                            if(prevHole == ''){
                                job.blockAtThisTime = currBlocks.map(currBlock=>{
                                    if(currBlock.size>=job.mr && isPasok == false && currBlock.status != 'busy'){
                                        currBlock.status = 'busy'
                                        currBlock.jobNumber = job.id
                                        currBlock.jobSize = job.mr
                                        currBlock.internalFragment = currBlock.size - job.mr
                                        isPasok = true
                                        prevHole = currBlock.id
                                    }
                                    return currBlock
                                })
                            }else{
                                let isFind = false;
                                job.blockAtThisTime = currBlocks.map(currBlock=>{
                                    if(currBlock.id == prevHole){
                                        isFind = true
                                    }
        
                                    if(currBlock.size>=job.mr && isPasok == false && currBlock.status != 'busy' && isFind == true){
                                        currBlock.status = 'busy'
                                        currBlock.jobNumber = job.id
                                        currBlock.jobSize = job.mr
                                        currBlock.internalFragment = currBlock.size - job.mr
                                        isPasok = true
                                        prevHole = currBlock.id
                                    }
                                    return currBlock
                                })
        
                                isFind = false
                                if(isPasok == false){
                                    job.blockAtThisTime = currBlocks.map(currBlock=>{
                                        if(currBlock.id == prevHole){
                                            isFind = true
                                        }
            
                                        if(currBlock.size>=job.mr && isPasok == false && currBlock.status != 'busy' && isFind == false){
                                            currBlock.status = 'busy'
                                            currBlock.jobNumber = job.id
                                            currBlock.jobSize = job.mr
                                            currBlock.internalFragment = currBlock.size - job.mr
                                            isPasok = true
                                            prevHole = currBlock.id
                                        }
                                        return currBlock
                                    })
                                }
                            }
                        }
                        
                        
                        currBlocks = job.blockAtThisTime
        
                        //compute external fragment
                        if(!isPasok){
                            currBlocks.forEach(currBlock=>{
                                if(currBlock.status == 'free')
                                job.totalExternalFragment+=currBlock.size
                            })
                        }
        
                        //computer internal fragment
                        currBlocks.forEach(currBlock=>{
                            if(currBlock.status == 'busy')
                            job.totalInternalFragment+=currBlock.internalFragment
                        })
        
                        //total fragment
                        job.totalFragment = job.totalInternalFragment +job.totalExternalFragment 
        
                        //Memory Utilization Percentage (MU%)
                        job.mu = (((totalUserSpace - job.totalFragment)/totalUserSpace)*100).toFixed(2)
        
                        memOutput+=
                        '<h5>Time = '+job.arrivalTime+'</h5>'+
                                '<table class="table">'+
                                    '<thead>'+
                                    '<tr id="tableTitle">'+
                                        '<th scope="col">Block Id</th>'+
                                        '<th scope="col">Block Size</th>'+
                                        '<th scope="col" >Job Number</th>'+
                                        '<th scope="col" >Job Size</th>'+
                                        '<th scope="col" >Status</th>'+
                                        '<th scope="col" >Internal Fragment</th>'+
                                    '</tr>'+
                                    '</thead>'+
                                    '<tbody>'
        
                                    job.blockAtThisTime.forEach(e=>{
                                        memOutput += 
                                        '<tr>'+
                                            '<td>M'+e.id+'</td>'+
                                            '<td>'+e.size+'</td>'+
                                            '<td>'+(e.jobNumber == undefined ? '' : 'J'+e.jobNumber)+'</td>'+
                                            '<td>'+(e.jobSize == undefined ? '' : e.jobSize)+'</td>'+
                                            '<td class="text-capitalize '+(e.status == 'busy' ? 'text-danger' : 'text-success')+'">'+e.status+'</td>'+
                                            '<td>'+(e.internalFragment == undefined ? '' : e.internalFragment)+'</td>'+
                                        '</tr>'
                                    })
                        memOutput+=
                        '<tr>'+
                            '<td>IF: '+(job.totalInternalFragment).toFixed(2)+'</td>'+
                            '<td>EF: '+(job.totalExternalFragment).toFixed(2)+'</td>'+
                            '<td>TF: '+(job.totalFragment).toFixed(2)+'</td>'+
                            '<td></td>'+
                            '<td></td>'+
                            '<td></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>MU%: '+    job.mu+'</td>'+
                            '<td></td>'+
                            '<td></td>'+
                            '<td></td>'+
                            '<td></td>'+
                            '<td></td>'+
                        '</tr>'+
                        '</tbody>'+
                                '</table>'
                    })
                    document.getElementById('memOutput').innerHTML = memOutput;
                    document.getElementById('computeButton').innerHTML = ''
                })
        })
    }
})


// SAD REAX