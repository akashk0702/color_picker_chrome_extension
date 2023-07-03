const btn=document.querySelector('.changeClrBtn');
const clrgrid=document.querySelector('.colorGrid');
const clrval=document.querySelector('.colorvalue');
btn.addEventListener('click', async() =>{
    // console.log('clicked');
    let[tab] = await chrome.tabs.query({ active: true, currentWindow: true});
    // console.log(tab);
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor,
    },
    async (injectionResults) =>{
        const [data] =injectionResults;
        if(data.result){
            const color=data.result.sRGBHex;
            clrgrid.style.backgroundColor = color;
            clrval.innerText = color;
            try{
                await navigator.clipboard.writeText(color);
            }
            catch(err){
                console.error(err)
            }
            console.log(clrgrid);
        }
        
    }
    );
});

async function pickColor(){
    // console.log('script working');
    try{
        const eyeDropper=new EyeDropper();
        return await eyeDropper.open();
        // console.log(selectedColor)

    } 
    catch(err){
        console.error(err);
    }
}