const input = document.getElementById('temp')
const choix = document.getElementById('conversion')
const sortie = document.getElementById('sortie')
const choixsortie = document.getElementById('converti')
const form = document.getElementById('converter')

function convert (valeur,initial,resultat){
    if(initial==='c'){
        if(resultat==='k'){
            return valeur + 273.15
        }
        return valeur
    }
    if(initial==='k'){
        if(resultat==='c'){
            return valeur - 273.15
        }
        return valeur
    }
    throw new Error('Unité invalide')
}
form.addEventListener('input',()=>{
    const inputtemp = parseFloat(input.value)
    const uniteinitial = choix.value
    const unitesortie = choixsortie.value
    const resultat = convert(inputtemp,uniteinitial,unitesortie)
    sortie.value = (Math.round(resultat*100)/100) + ''+ unitesortie.toUpperCase();
})