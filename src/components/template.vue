<template>
    <div class="w-full flex flex-col justify-center items-center">
        <img class="h-28" src="https://fipu.unipu.hr/_pub/themes_static/unipu2020/fipu/icons/fipu_hr.png">
        <div class="mt-8 text-2xl">Potvrda o obavljenoj praksi</div>
    </div>
    <div class="flex w-full mt-12 justify-center gap-2">
        <div class="text-right w-28 font-bold">Student:</div>
        <div class="text-left grow">
            Luka Blašković
            <br>
            <a href="mailto:luka.blaskovic@student.unipu.hr" class="text-xs">luka.blaskovic@student.unipu.hr</a>
            <br>
            <div class="text-xs">0917217631</div>
        </div>
        <div class="text-left w-fit font-bold">OIB:</div>
        <div class="text-left grow">56768537128</div>
    </div>
    <div class="flex w-full mt-2 justify-center gap-2">
        <div class="text-right w-28 min-w-[112px] font-bold">Poduzeće:</div>
        <div class="text-left grow"> Sveučilište Jurja Dobile u Puli </div>
    </div>
    <div class="flex w-full mt-2 justify-center gap-2">
        <div class="text-right w-28 min-w-[112px] font-bold">Poduzeće:</div>
        <div class="text-left grow"> doc. dr. sc. Nikola Tanković </div>
    </div>
    <div class="flex w-full mt-2 justify-center gap-2">
        <div class="text-right w-28 min-w-[112px] font-bold">Mentor(ica):</div>
        <div class="text-left grow"> Sveučilište Jurja Dobile u Puli </div>
    </div>
    <div class="flex w-full mt-2 justify-center gap-2">
        <div class="text-right w-28 min-w-[112px] font-bold">Razdoblje:</div>
        <div class="text-left grow"> 1/2/2023 do 1/3/2023 </div>
    </div>
    <div class="flex w-full mt-2 justify-center gap-2">
        <div class="text-right w-28 min-w-[112px] font-bold">Broj sati:</div>
        <div class="text-left grow"> 100 </div>
    </div>
    <div class="flex w-full mt-2 justify-center gap-2">
        <div class="text-right w-28 min-w-[112px] font-bold whitespace-nowrap">Opis zadatka:</div>
        <div class="text-left w-fit"> 
            Zadatak je bio izraditi konverzacijskog intent-recognition chatbot-a koji odgovara na
            upite studenata ili služi za pokretanje nekih procesa (pr. prijava zadataka za praksu).
            U prvoj fazi radio sam kategorizaciju studentskih upita u predefinirane topicse
            koristeći spacy i sentence-transformer (SBERT) frameworke. Zatim je to bilo
            nadograđeno da se korisniku vrati predefinirani odgovor najveće sličnosti s
            postavljenim free-form pitanjem. Servis je implementiran u python asyncio dok je
            jednostavan frontend izrađen u Vue.js-u. <br>
            U drugoj fazi sam isto implementirao koristeći Rasa framework uz dodatne    
        </div>
    </div>
    <hr class="mt-24 border-gray-400 border-dashed">
    <div class="text-gray-400 text-xs">Popunjava mentor po završetku prakse</div>
    <div class="mt-4">Ime i prezime mentor(a/ice) ukoliko je različit(a) od gore naveden(a/e):</div>
</template>