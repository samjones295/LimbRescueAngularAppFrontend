import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartLegendItem } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit {
  // scatter
  public scatterChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    scales:  {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time',
          fontSize: 25
        },
        ticks: {
          fontSize: 20
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Reading Value',
          fontSize: 25
        },
        ticks: {
          fontSize: 20
        }
      }]
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy'
        },
        zoom: {
          enabled: true,
          mode: 'xy'
        }
      }
    }
  };

  public scatterChartData: ChartDataSets[] = [
    {
      data: [
        { x: 0, y: 165203 },
        { x: 0.033332969, y: 159931 },
        { x: 0.066665938, y: 152824 },
        { x: 0.099998906, y: 147313 },
        { x: 0.133331875, y: 137905 },
        { x: 0.166664844, y: 127599 },
        { x: 0.199997813, y: 122653 },
        { x: 0.233330781, y: 235824 },
        { x: 0.26666375, y: 234145 },
        { x: 0.299996719, y: 236675 },
        { x: 0.333329688, y: 241255 },
        { x: 0.366662656, y: 243288 },
        { x: 0.399995625, y: 247431 },
        { x: 0.433328594, y: 250809 },
        { x: 0.466661563, y: 256169 },
        { x: 0.499994531, y: 261693 },
        { x: 0.5333275, y: 264565 },
        { x: 0.566660469, y: 164804 },
        { x: 0.599993438, y: 117275 },
        { x: 0.633326406, y: 75601 },
        { x: 0.666659375, y: 43504 },
        { x: 0.699992344, y: 24264 },
        { x: 0.733325313, y: 14231 },
        { x: 0.766658281, y: 8803 },
        { x: 0.79999125, y: 9840 },
        { x: 0.833324219, y: 9397 },
        { x: 0.866657188, y: 8387 },
        { x: 0.899990156, y: 167108 },
        { x: 0.933323125, y: 165299 },
        { x: 0.966656094, y: 168968 },
        { x: 0.999989063, y: 174629 },
        { x: 1.033322031, y: 182325 },
        { x: 1.066655, y: 191520 },
        { x: 1.099987969, y: 200229 },
        { x: 1.133320938, y: 210013 },
        { x: 1.166653906, y: 218789 },
        { x: 1.199986875, y: 228536 },
        { x: 1.233319844, y: 205162 },
        { x: 1.266652813, y: 213144 },
        { x: 1.299985781, y: 209433 },
        { x: 1.33331875, y: 171041 },
        { x: 1.366651719, y: 126361 },
        { x: 1.399984688, y: 96088 },
        { x: 1.433317656, y: 76682 },
        { x: 1.466650625, y: 61912 },
        { x: 1.499983594, y: 57538 },
        { x: 1.533316563, y: 58840 },
        { x: 1.566649531, y: 76952 },
        { x: 1.5999825, y: 78050 },
        { x: 1.633315469, y: 75214 },
        { x: 1.666648438, y: 72173 },
        { x: 1.699981406, y: 73729 },
        { x: 1.733314375, y: 77310 },
        { x: 1.766647344, y: 84604 },
        { x: 1.799980313, y: 92352 },
        { x: 1.833313281, y: 100941 },
        { x: 1.86664625, y: 108740 },
        { x: 1.899979219, y: 132708 },
        { x: 1.933312188, y: 139778 },
        { x: 1.966645156, y: 147437 },
        { x: 1.999978125, y: 155573 },
        { x: 2.033311094, y: 167781 },
        { x: 2.066644063, y: 175493 },
        { x: 2.099977031, y: 162849 },
        { x: 2.13331, y: 120276 },
        { x: 2.166642969, y: 73617 },
        { x: 2.199975938, y: 39914 },
        { x: 2.233308906, y: -102361 },
        { x: 2.266641875, y: -115701 },
        { x: 2.299974844, y: -124547 },
        { x: 2.333307813, y: -124484 },
        { x: 2.366640781, y: -122840 },
        { x: 2.39997375, y: -123669 },
        { x: 2.433306719, y: -126033 },
        { x: 2.466639688, y: -126707 },
        { x: 2.499972656, y: -121895 },
        { x: 2.533305625, y: -120020 },
        { x: 2.566638594, y: 6644 },
        { x: 2.599971563, y: 13472 },
        { x: 2.633304531, y: 22986 },
        { x: 2.6666375, y: 31672 },
        { x: 2.699970469, y: 44688 },
        { x: 2.733303438, y: 55620 },
        { x: 2.766636406, y: 65018 },
        { x: 2.799969375, y: 75237 },
        { x: 2.833302344, y: 87098 },
        { x: 2.866635313, y: 102101 },
        { x: 2.899968281, y: 40017 },
        { x: 2.93330125, y: 21013 },
        { x: 2.966634219, y: -19480 },
        { x: 2.999967188, y: -54068 },
        { x: 3.033300156, y: -76558 },
        { x: 3.066633125, y: -88955 },
        { x: 3.099966094, y: -94256 },
        { x: 3.133299063, y: -91499 },
        { x: 3.166632031, y: -85384 },
        { x: 3.199965, y: -82058 },
        { x: 3.233297969, y: -63667 },
        { x: 3.266630938, y: -61758 },
        { x: 3.299963906, y: -58122 },
        { x: 3.333296875, y: -51540 },
        { x: 3.366629844, y: -43458 },
        { x: 3.399962813, y: -32831 },
        { x: 3.433295781, y: -20587 },
        { x: 3.46662875, y: -7358 },
        { x: 3.499961719, y: 3797 },
        { x: 3.533294688, y: 15116 },
        { x: 3.566627656, y: 51811 },
        { x: 3.599960625, y: 62679 },
        { x: 3.633293594, y: 79939 },
        { x: 3.666626563, y: 91808 },
        { x: 3.699959531, y: 103257 },
        { x: 3.7332925, y: 97024 },
        { x: 3.766625469, y: 63993 },
        { x: 3.799958438, y: 25273 },
        { x: 3.833291406, y: -8120 },
        { x: 3.866624375, y: -24692 },
        { x: 3.899957344, y: -161989 },
        { x: 3.933290313, y: -160961 },
        { x: 3.966623281, y: -157609 },
        { x: 3.99995625, y: -153058 },
        { x: 4.033289219, y: -148509 },
        { x: 4.066622188, y: -149058 },
        { x: 4.099955156, y: -146493 },
        { x: 4.133288125, y: -142072 },
        { x: 4.166621094, y: -137801 },
        { x: 4.199954063, y: -128254 },
        { x: 4.233287031, y: -79694 },
        { x: 4.26662, y: -68354 },
        { x: 4.299952969, y: -58864 },
        { x: 4.333285938, y: -45930 },
        { x: 4.366618906, y: -35472 },
        { x: 4.399951875, y: -23234 },
        { x: 4.433284844, y: -13562 },
        { x: 4.466617813, y: -3841 },
        { x: 4.499950781, y: 8148 },
        { x: 4.53328375, y: 24022 },
        { x: 4.566616719, y: -89626 },
        { x: 4.599949688, y: -101657 },
        { x: 4.633282656, y: -142978 },
        { x: 4.666615625, y: -184310 },
        { x: 4.699948594, y: -210536 },
        { x: 4.733281563, y: -226910 },
        { x: 4.766614531, y: -236257 },
        { x: 4.7999475, y: -235760 },
        { x: 4.833280469, y: -229829 },
        { x: 4.866613438, y: -224696 },
        { x: 4.899946406, y: -345909 },
        { x: 4.933279375, y: -345131 },
        { x: 4.966612344, y: -339992 },
        { x: 4.999945313, y: -333552 },
        { x: 5.033278281, y: -326360 },
        { x: 5.06661125, y: -316615 },
        { x: 5.099944219, y: -305237 },
        { x: 5.133277188, y: -291981 },
        { x: 5.166610156, y: -277312 },
        { x: 5.199943125, y: -263672 },
        { x: 5.233276094, y: -114462 },
        { x: 5.266609063, y: -100987 },
        { x: 5.299942031, y: -89408 },
        { x: 5.333275, y: -73726 },
        { x: 5.366607969, y: -58147 },
        { x: 5.399940938, y: -40142 },
        { x: 5.433273906, y: -27807 },
        { x: 5.466606875, y: -34828 },
        { x: 5.499939844, y: -68704 },
        { x: 5.533272813, y: -99334 },
        { x: 5.566605781, y: -192375 },
        { x: 5.59993875, y: -197359 },
        { x: 5.633271719, y: -197591 },
        { x: 5.666604688, y: -187610 },
        { x: 5.699937656, y: -177862 },
        { x: 5.733270625, y: -165782 },
        { x: 5.766603594, y: -155408 },
        { x: 5.799936563, y: -146803 },
        { x: 5.833269531, y: -140423 },
        { x: 5.8666025, y: -128724 },
        { x: 5.899935469, y: -48044 },
        { x: 5.933268438, y: -35889 },
        { x: 5.966601406, y: -18632 },
        { x: 5.999934375, y: -535 },
        { x: 6.033267344, y: 17219 },
        { x: 6.066600313, y: 31256 },
        { x: 6.099933281, y: 50603 },
        { x: 6.13326625, y: 65207 },
        { x: 6.166599219, y: 78372 },
        { x: 6.199932188, y: 94473 },
        { x: 6.233265156, y: 34020 },
        { x: 6.266598125, y: 48479 },
        { x: 6.299931094, y: 63120 },
        { x: 6.333264063, y: 51640 },
        { x: 6.366597031, y: 9313 },
        { x: 6.39993, y: -30784 },
        { x: 6.433262969, y: -62240 },
        { x: 6.466595938, y: -80413 },
        { x: 6.499928906, y: -89967 },
        { x: 6.533261875, y: -91273 },
        { x: 6.566594844, y: -221678 },
        { x: 6.599927813, y: -216922 },
        { x: 6.633260781, y: -216550 },
        { x: 6.66659375, y: -216462 },
        { x: 6.699926719, y: -217036 },
        { x: 6.733259688, y: -214766 },
        { x: 6.766592656, y: -210024 },
        { x: 6.799925625, y: -204413 },
        { x: 6.833258594, y: -195746 },
        { x: 6.866591563, y: -185182 },
        { x: 6.899924531, y: 126909 },
        { x: 6.9332575, y: 138553 },
        { x: 6.966590469, y: 149508 },
        { x: 6.999923438, y: 159280 },
        { x: 7.033256406, y: 170525 },
        { x: 7.066589375, y: 181844 },
        { x: 7.099922344, y: 193001 },
        { x: 7.133255313, y: 204776 },
        { x: 7.166588281, y: 218505 },
        { x: 7.19992125, y: 221764 },
        { x: 7.233254219, y: 115539 },
        { x: 7.266587188, y: 73189 },
        { x: 7.299920156, y: 40771 },
        { x: 7.333253125, y: 21900 },
        { x: 7.366586094, y: 14041 },
        { x: 7.399919063, y: 13592 },
        { x: 7.433252031, y: 20752 },
        { x: 7.466585, y: 29199 },
        { x: 7.499917969, y: 33591 },
        { x: 7.533250938, y: 37907 },
        { x: 7.566583906, y: 131584 },
        { x: 7.599916875, y: 146848 },
        { x: 7.633249844, y: 162797 },
        { x: 7.666582813, y: 177788 },
        { x: 7.699915781, y: 196757 },
        { x: 7.73324875, y: 214691 },
        { x: 7.766581719, y: 235635 },
        { x: 7.799914688, y: 261368 },
        { x: 7.833247656, y: 294575 },
        { x: 7.866580625, y: 317836 },
        { x: 7.899913594, y: 368153 },
        { x: 7.933246563, y: 362930 },
        { x: 7.966579531, y: 355201 },
        { x: 7.9999125, y: 353234 },
        { x: 8.033245469, y: 345008 },
        { x: 8.066578438, y: 307169 },
        { x: 8.099911406, y: 243452 },
        { x: 8.133244375, y: 190465 },
        { x: 8.166577344, y: 140310 },
        { x: 8.199910313, y: 103830 },
        { x: 8.233243281, y: -15852 },
        { x: 8.26657625, y: -33038 },
        { x: 8.299909219, y: -41750 },
        { x: 8.333242188, y: -44642 },
        { x: 8.366575156, y: -48414 },
        { x: 8.399908125, y: -50501 },
        { x: 8.433241094, y: -46558 },
        { x: 8.466574063, y: -41392 },
        { x: 8.499907031, y: -29478 },
        { x: 8.53324, y: -18318 },
        { x: 8.566572969, y: 62775 },
        { x: 8.599905938, y: 76794 },
        { x: 8.633238906, y: 88043 },
        { x: 8.666571875, y: 101315 },
        { x: 8.699904844, y: 108738 },
        { x: 8.733237813, y: 118840 },
        { x: 8.766570781, y: 123296 },
        { x: 8.79990375, y: 131768 },
        { x: 8.833236719, y: 141586 },
        { x: 8.866569688, y: 153950 },
        { x: 8.899902656, y: 63998 },
        { x: 8.933235625, y: 19837 },
        { x: 8.966568594, y: -28958 },
        { x: 8.999901563, y: -65831 },
        { x: 9.033234531, y: -90554 },
        { x: 9.0665675, y: -105891 },
        { x: 9.099900469, y: -110984 },
        { x: 9.133233438, y: -114290 },
        { x: 9.166566406, y: -110279 },
        { x: 9.199899375, y: -112147 },
        { x: 9.233232344, y: -74032 },
        { x: 9.266565313, y: -74943 },
        { x: 9.299898281, y: -74444 },
        { x: 9.33323125, y: -68328 },
        { x: 9.366564219, y: -67082 },
        { x: 9.399897188, y: -57782 },
        { x: 9.433230156, y: -51484 },
        { x: 9.466563125, y: -38770 },
        { x: 9.499896094, y: -26903 },
        { x: 9.533229063, y: -15847 },
        { x: 9.566562031, y: 7785 },
        { x: 9.599895, y: 18821 },
        { x: 9.633227969, y: 27941 },
        { x: 9.666560938, y: 39897 },
        { x: 9.699893906, y: 54212 },
        { x: 9.733226875, y: 64187 },
        { x: 9.766559844, y: 47028 },
        { x: 9.799892813, y: 1635 },
        { x: 9.833225781, y: -29276 },
        { x: 9.86655875, y: -47783 },
        { x: 9.899891719, y: -160015 },
        { x: 9.933224688, y: -160340 },
        { x: 9.966557656, y: -150355 },
        { x: 9.999890625, y: -139707 },
        { x: 10.03322359, y: -134203 },
        { x: 10.06655656, y: -131039 },
        { x: 10.09988953, y: -125907 },
        { x: 10.1332225, y: -119464 },
        { x: 10.16655547, y: -114525 },
        { x: 10.19988844, y: -104480 },
        { x: 10.23322141, y: 45238 },
        { x: 10.26655438, y: 60198 },
        { x: 10.29988734, y: 70609 },
        { x: 10.33322031, y: 84800 },
        { x: 10.36655328, y: 97509 },
        { x: 10.39988625, y: 108806 },
        { x: 10.43321922, y: 122550 },
        { x: 10.46655219, y: 134321 },
        { x: 10.49988516, y: 147782 },
        { x: 10.53321813, y: 163380 },
        { x: 10.56655109, y: 103128 },
        { x: 10.59988406, y: 67313 },
        { x: 10.63321703, y: 20301 },
        { x: 10.66655, y: -11757 },
        { x: 10.69988297, y: -32571 },
        { x: 10.73321594, y: -42592 },
        { x: 10.76654891, y: -45412 },
        { x: 10.79988188, y: -41661 },
        { x: 10.83321484, y: -35892 },
        { x: 10.86654781, y: -33651 },
        { x: 10.89988078, y: -3103 },
        { x: 10.93321375, y: -2284 },
        { x: 10.96654672, y: -1707 },
        { x: 10.99987969, y: 4617 },
        { x: 11.03321266, y: 13777 },
        { x: 11.06654563, y: 23074 },
        { x: 11.09987859, y: 34657 },
        { x: 11.13321156, y: 44736 },
        { x: 11.16654453, y: 55994 },
        { x: 11.1998775, y: 67657 },
        { x: 11.23321047, y: 49371 },
        { x: 11.26654344, y: 59040 },
        { x: 11.29987641, y: 69664 },
        { x: 11.33320938, y: 81099 },
        { x: 11.36654234, y: 94390 },
        { x: 11.39987531, y: 93798 },
        { x: 11.43320828, y: 56779 },
        { x: 11.46654125, y: 10816 },
        { x: 11.49987422, y: -27306 },
        { x: 11.53320719, y: -50610 },
        { x: 11.56654016, y: -197846 },
        { x: 11.59987313, y: -202616 },
        { x: 11.63320609, y: -201083 },
        { x: 11.66653906, y: -194028 },
        { x: 11.69987203, y: -190854 },
        { x: 11.733205, y: -190680 },
        { x: 11.76653797, y: -190263 },
        { x: 11.79987094, y: -188776 },
        { x: 11.83320391, y: -184319 },
        { x: 11.86653688, y: -178892 },
        { x: 11.89986984, y: -88812 },
        { x: 11.93320281, y: -79955 },
        { x: 11.96653578, y: -68204 },
        { x: 11.99986875, y: -55159 },
        { x: 12.03320172, y: -46755 },
        { x: 12.06653469, y: -35984 },
        { x: 12.09986766, y: -26288 },
        { x: 12.13320063, y: -13776 },
        { x: 12.16653359, y: -1810 },
        { x: 12.19986656, y: 15905 },
        { x: 12.23319953, y: -82386 },
        { x: 12.2665325, y: -113806 },
        { x: 12.29986547, y: -154845 },
        { x: 12.33319844, y: -184822 },
        { x: 12.36653141, y: -199182 },
        { x: 12.39986438, y: -206090 },
        { x: 12.43319734, y: -204940 },
        { x: 12.46653031, y: -195576 },
        { x: 12.49986328, y: -184698 },
        { x: 12.53319625, y: -179893 },
        { x: 12.56652922, y: -106696 },
        { x: 12.59986219, y: -101316 },
        { x: 12.63319516, y: -97897 },
        { x: 12.66652813, y: -87424 },
        { x: 12.69986109, y: -79114 },
        { x: 12.73319406, y: -65869 },
        { x: 12.76652703, y: -52812 },
        { x: 12.79986, y: -37200 },
        { x: 12.83319297, y: -24394 },
        { x: 12.86652594, y: -7552 },
        { x: 12.89985891, y: 6816 },
        { x: 12.93319188, y: 19767 },
        { x: 12.96652484, y: 34691 },
        { x: 12.99985781, y: 50174 },
        { x: 13.03319078, y: 62498 },
        { x: 13.06652375, y: 48828 },
        { x: 13.09985672, y: 8779 },
        { x: 13.13318969, y: -27220 },
        { x: 13.16652266, y: -47510 },
        { x: 13.19985563, y: -57965 },
        { x: 13.23318859, y: -164700 },
        { x: 13.26652156, y: -160385 },
        { x: 13.29985453, y: -146977 },
        { x: 13.3331875, y: -137382 },
        { x: 13.36652047, y: -132392 },
        { x: 13.39985344, y: -126360 },
        { x: 13.43318641, y: -121313 },
        { x: 13.46651938, y: -113185 },
        { x: 13.49985234, y: -103917 },
        { x: 13.53318531, y: -94760 },
        { x: 13.56651828, y: 44283 },
        { x: 13.59985125, y: 59192 },
        { x: 13.63318422, y: 75356 },
        { x: 13.66651719, y: 88048 },
        { x: 13.69985016, y: 100320 },
        { x: 13.73318313, y: 109526 },
        { x: 13.76651609, y: 121199 },
        { x: 13.79984906, y: 137080 },
        { x: 13.83318203, y: 152382 },
        { x: 13.866515, y: 161098 },
        { x: 13.89984797, y: 63180 },
        { x: 13.93318094, y: 15606 },
        { x: 13.96651391, y: -28842 },
        { x: 13.99984688, y: -57446 },
        { x: 14.03317984, y: -74842 },
        { x: 14.06651281, y: -83264 },
        { x: 14.09984578, y: -80926 },
        { x: 14.13317875, y: -77752 },
        { x: 14.16651172, y: -74414 },
        { x: 14.19984469, y: -70834 },
        { x: 14.23317766, y: -12128 },
        { x: 14.26651063, y: -10571 },
        { x: 14.29984359, y: -5701 },
        { x: 14.33317656, y: -435 },
        { x: 14.36650953, y: 6472 },
        { x: 14.3998425, y: 17163 },
        { x: 14.43317547, y: 28209 },
        { x: 14.46650844, y: 38485 },
        { x: 14.49984141, y: 50403 },
        { x: 14.53317438, y: 60021 },
        { x: 14.56650734, y: -27843 },
        { x: 14.59984031, y: -17948 },
        { x: 14.63317328, y: -5992 },
        { x: 14.66650625, y: 8278 },
        { x: 14.69983922, y: 16092 },
        { x: 14.73317219, y: -7251 },
        { x: 14.76650516, y: -53194 },
        { x: 14.79983813, y: -93252 },
        { x: 14.83317109, y: -117056 },
        { x: 14.86650406, y: -126739 },
        { x: 14.89983703, y: -356731 },
        { x: 14.93317, y: -353388 },
        { x: 14.96650297, y: -345577 },
        { x: 14.99983594, y: -343551 },
        { x: 15.03316891, y: -343123 },
        { x: 15.06650188, y: -343939 },
        { x: 15.09983484, y: -342192 },
        { x: 15.13316781, y: -337601 },
        { x: 15.16650078, y: -330641 },
        { x: 15.19983375, y: -320927 },
        { x: 15.23316672, y: -191517 },
        { x: 15.26649969, y: -174218 },
        { x: 15.29983266, y: -162210 },
        { x: 15.33316563, y: -149738 },
        { x: 15.36649859, y: -133114 },
        { x: 15.39983156, y: -119589 },
        { x: 15.43316453, y: -106850 },
        { x: 15.4664975, y: -90244 },
        { x: 15.49983047, y: -78037 },
        { x: 15.53316344, y: -87682 },
        { x: 15.56649641, y: -279849 },
        { x: 15.59982938, y: -320337 },
        { x: 15.63316234, y: -348398 },
        { x: 15.66649531, y: -359641 },
        { x: 15.69982828, y: -366169 },
        { x: 15.73316125, y: -356458 },
        { x: 15.76649422, y: -339361 },
        { x: 15.79982719, y: -326964 },
        { x: 15.83316016, y: -323516 },
        { x: 15.86649313, y: -330409 },
        { x: 15.89982609, y: -294983 },
        { x: 15.93315906, y: -280980 },
        { x: 15.96649203, y: -254194 },
        { x: 15.999825, y: -226016 },
        { x: 16.03315797, y: -194547 },
        { x: 16.06649094, y: -165612 },
        { x: 16.09982391, y: -140564 },
        { x: 16.13315688, y: -120442 },
        { x: 16.16648984, y: -97552 },
        { x: 16.19982281, y: -77880 },
        { x: 16.23315578, y: -108669 },
        { x: 16.26648875, y: -90429 },
        { x: 16.29982172, y: -66581 },
        { x: 16.33315469, y: -47340 },
        { x: 16.36648766, y: -49432 },
        { x: 16.39982063, y: -91275 },
        { x: 16.43315359, y: -135261 },
        { x: 16.46648656, y: -165761 },
        { x: 16.49981953, y: -186028 },
        { x: 16.5331525, y: -194711 },
        { x: 16.56648547, y: -337986 },
        { x: 16.59981844, y: -327326 },
        { x: 16.63315141, y: -314799 },
        { x: 16.66648438, y: -309266 },
        { x: 16.69981734, y: -299674 },
        { x: 16.73315031, y: -290006 },
        { x: 16.76648328, y: -277043 },
        { x: 16.79981625, y: -259090 },
        { x: 16.83314922, y: -244172 },
        { x: 16.86648219, y: -226480 },
        { x: 16.89981516, y: -99701 },
        { x: 16.93314813, y: -82066 },
        { x: 16.96648109, y: -66252 },
        { x: 16.99981406, y: -50196 },
        { x: 17.03314703, y: -38437 },
        { x: 17.06648, y: -22832 },
        { x: 17.09981297, y: -8938 },
        { x: 17.13314594, y: 6224 },
        { x: 17.16647891, y: 24904 },
        { x: 17.19981188, y: 33914 },
        { x: 17.23314484, y: 78321 },
        { x: 17.26647781, y: 32725 },
        { x: 17.29981078, y: 1600 },
        { x: 17.33314375, y: -18464 },
        { x: 17.36647672, y: -29198 },
        { x: 17.39980969, y: -28980 },
        { x: 17.43314266, y: -19459 },
        { x: 17.46647563, y: -7872 },
        { x: 17.49980859, y: -3491 },
        { x: 17.53314156, y: 498 },
        { x: 17.56647453, y: 70877 },
        { x: 17.5998075, y: 75229 },
        { x: 17.63314047, y: 83363 },
        { x: 17.66647344, y: 96312 },
        { x: 17.69980641, y: 109897 },
        { x: 17.73313938, y: 123021 },
        { x: 17.76647234, y: 137984 },
        { x: 17.79980531, y: 152320 },
        { x: 17.83313828, y: 169401 },
        { x: 17.86647125, y: 184760 },
        { x: 17.89980422, y: 274859 },
        { x: 17.93313719, y: 289285 },
        { x: 17.96647016, y: 304024 },
        { x: 17.99980313, y: 321135 },
        { x: 18.03313609, y: 335488 },
        { x: 18.06646906, y: 320533 },
        { x: 18.09980203, y: 278477 },
        { x: 18.133135, y: 234021 },
        { x: 18.16646797, y: 206940 },
        { x: 18.19980094, y: 192331 },
        { x: 18.23313391, y: 100777 },
        { x: 18.26646688, y: 103484 },
        { x: 18.29979984, y: 113641 },
        { x: 18.33313281, y: 123573 },
        { x: 18.36646578, y: 129089 },
        { x: 18.39979875, y: 133144 },
        { x: 18.43313172, y: 131136 },
        { x: 18.46646469, y: 123781 },
        { x: 18.49979766, y: 115737 },
        { x: 18.53313063, y: 99975 },
        { x: 18.56646359, y: 168224 },
        { x: 18.59979656, y: 154163 },
        { x: 18.63312953, y: 148629 },
        { x: 18.6664625, y: 147251 },
        { x: 18.69979547, y: 149536 },
        { x: 18.73312844, y: 157677 },
        { x: 18.76646141, y: 163389 },
        { x: 18.79979438, y: 171651 },
        { x: 18.83312734, y: 181047 },
        { x: 18.86646031, y: 191244 },
        { x: 18.89979328, y: 133723 },
        { x: 18.93312625, y: 114088 },
        { x: 18.96645922, y: 63720 },
        { x: 18.99979219, y: 15555 },
        { x: 19.03312516, y: -19774 },
        { x: 19.06645813, y: -40208 },
        { x: 19.09979109, y: -53194 },
        { x: 19.13312406, y: -58250 },
        { x: 19.16645703, y: -56122 },
        { x: 19.19979, y: -55200 },
        { x: 19.23312297, y: -61300 },
        { x: 19.26645594, y: -62735 },
        { x: 19.29978891, y: -64503 },
        { x: 19.33312188, y: -66479 },
        { x: 19.36645484, y: -60680 },
        { x: 19.39978781, y: -56512 },
        { x: 19.43312078, y: -49684 },
        { x: 19.46645375, y: -39620 },
        { x: 19.49978672, y: -30103 },
        { x: 19.53311969, y: -20991 },
        { x: 19.56645266, y: 94134 },
        { x: 19.59978563, y: 103265 },
        { x: 19.63311859, y: 114137 },
        { x: 19.66645156, y: 127793 },
        { x: 19.69978453, y: 138200 },
        { x: 19.7331175, y: 153254 },
        { x: 19.76645047, y: 158284 },
        { x: 19.79978344, y: 130050 },
        { x: 19.83311641, y: 87664 },
        { x: 19.86644938, y: 57569 },
        { x: 19.89978234, y: -32032 },
        { x: 19.93311531, y: -42754 },
        { x: 19.96644828, y: -41396 },
        { x: 19.99978125, y: -34831 },
        { x: 20.03311422, y: -25618 },
        { x: 20.06644719, y: -23831 },
        { x: 20.09978016, y: -22731 },
        { x: 20.13311313, y: -20223 },
        { x: 20.16644609, y: -16715 },
        { x: 20.19977906, y: -8278 },
        { x: 20.23311203, y: 157119 },
        { x: 20.266445, y: 167539 },
        { x: 20.29977797, y: 176579 },
        { x: 20.33311094, y: 190320 },
        { x: 20.36644391, y: 203480 },
        { x: 20.39977688, y: 212360 },
        { x: 20.43310984, y: 222176 },
        { x: 20.46644281, y: 231870 },
        { x: 20.49977578, y: 243800 },
        { x: 20.53310875, y: 252582 },
        { x: 20.56644172, y: 232167 },
        { x: 20.59977469, y: 241968 },
        { x: 20.63310766, y: 217336 },
        { x: 20.66644063, y: 162634 },
        { x: 20.69977359, y: 121891 },
        { x: 20.73310656, y: 94068 },
        { x: 20.76643953, y: 74507 },
        { x: 20.7997725, y: 63275 },
        { x: 20.83310547, y: 60558 },
        { x: 20.86643844, y: 62363 },
        { x: 20.89977141, y: 27592 },
        { x: 20.93310438, y: 25507 },
        { x: 20.96643734, y: 22411 },
        { x: 20.99977031, y: 21551 },
        { x: 21.03310328, y: 21875 },
        { x: 21.06643625, y: 26307 },
        { x: 21.09976922, y: 33591 },
        { x: 21.13310219, y: 40808 },
        { x: 21.16643516, y: 48912 },
        { x: 21.19976813, y: 58520 },
        { x: 21.23310109, y: 118824 },
        { x: 21.26643406, y: 123935 },
        { x: 21.29976703, y: 134157 },
        { x: 21.3331, y: 141223 },
        { x: 21.36643297, y: 150811 },
        { x: 21.39976594, y: 163688 },
        { x: 21.43309891, y: 171037 },
        { x: 21.46643188, y: 155389 },
        { x: 21.49976484, y: 109512 },
        { x: 21.53309781, y: 60773 },
        { x: 21.56643078, y: -88406 },
        { x: 21.59976375, y: -113656 },
        { x: 21.63309672, y: -126732 },
        { x: 21.66642969, y: -131988 },
        { x: 21.69976266, y: -129982 },
        { x: 21.73309563, y: -128446 },
        { x: 21.76642859, y: -128934 },
        { x: 21.79976156, y: -132324 },
        { x: 21.83309453, y: -133289 },
        { x: 21.8664275, y: -129222 },
        { x: 21.89976047, y: -9383 },
        { x: 21.93309344, y: -3088 },
        { x: 21.96642641, y: 5624 },
        { x: 21.99975938, y: 15985 },
        { x: 22.03309234, y: 26029 },
        { x: 22.06642531, y: 33344 },
        { x: 22.09975828, y: 42593 },
        { x: 22.13309125, y: 51152 },
        { x: 22.16642422, y: 61496 },
        { x: 22.19975719, y: 74796 },
        { x: 22.23309016, y: 23136 },
        { x: 22.26642313, y: 35194 },
        { x: 22.29975609, y: 26518 },
        { x: 22.33308906, y: -11891 },
        { x: 22.36642203, y: -51043 },
        { x: 22.399755, y: -76115 },
        { x: 22.43308797, y: -90259 },
        { x: 22.46642094, y: -92970 },
        { x: 22.49975391, y: -88602 },
        { x: 22.53308688, y: -80350 },
        { x: 22.56641984, y: -52601 },
        { x: 22.59975281, y: -49341 },
        { x: 22.63308578, y: -45282 },
        { x: 22.66641875, y: -40333 },
        { x: 22.69975172, y: -35684 },
        { x: 22.73308469, y: -26414 },
        { x: 22.76641766, y: -14773 },
        { x: 22.79975063, y: -2593 },
        { x: 22.83308359, y: 12912 },
        { x: 22.86641656, y: 26692 },
        { x: 22.89974953, y: 103362 },
        { x: 22.9330825, y: 117557 },
        { x: 22.96641547, y: 127444 },
        { x: 22.99974844, y: 140582 },
        { x: 23.03308141, y: 154806 },
        { x: 23.06641438, y: 169390 },
        { x: 23.09974734, y: 173789 },
        { x: 23.13308031, y: 144490 },
        { x: 23.16641328, y: 96701 },
        { x: 23.19974625, y: 60250 },
        { x: 23.23307922, y: -68050 },
        { x: 23.26641219, y: -82244 },
        { x: 23.29974516, y: -87038 },
        { x: 23.33307813, y: -82573 },
        { x: 23.36641109, y: -75868 },
        { x: 23.39974406, y: -72094 },
        { x: 23.43307703, y: -72061 },
        { x: 23.46641, y: -67098 },
        { x: 23.49974297, y: -66164 },
        { x: 23.53307594, y: -61354 },
        { x: 23.56640891, y: 66313 },
        { x: 23.59974188, y: 75508 },
        { x: 23.63307484, y: 86809 },
        { x: 23.66640781, y: 98676 },
        { x: 23.69974078, y: 111377 },
        { x: 23.73307375, y: 120022 },
        { x: 23.76640672, y: 132342 },
        { x: 23.79973969, y: 138701 },
        { x: 23.83307266, y: 153404 },
        { x: 23.86640563, y: 167021 },
        { x: 23.89973859, y: -67750 },
        { x: 23.93307156, y: -78893 },
        { x: 23.96640453, y: -119716 },
        { x: 23.9997375, y: -167300 },
        { x: 24.03307047, y: -204754 },
        { x: 24.06640344, y: -225689 },
        { x: 24.09973641, y: -241372 },
        { x: 24.13306938, y: -247260 },
        { x: 24.16640234, y: -242937 },
        { x: 24.19973531, y: -238302 },
        { x: 24.23306828, y: -341045 },
        { x: 24.26640125, y: -342121 },
        { x: 24.29973422, y: -338730 },
        { x: 24.33306719, y: -337410 },
        { x: 24.36640016, y: -331109 },
        { x: 24.39973313, y: -323344 },
        { x: 24.43306609, y: -314234 },
        { x: 24.46639906, y: -301908 },
        { x: 24.49973203, y: -290056 },
        { x: 24.533065, y: -281180 },
        { x: 24.56639797, y: -135144 },
        { x: 24.59973094, y: -125248 },
        { x: 24.63306391, y: -110912 },
        { x: 24.66639688, y: -98280 },
        { x: 24.69972984, y: -85706 },
        { x: 24.73306281, y: -79556 },
        { x: 24.76639578, y: -104285 },
        { x: 24.79972875, y: -154688 },
        { x: 24.83306172, y: -190748 },
        { x: 24.86639469, y: -215685 },
        { x: 24.89972766, y: -324440 },
        { x: 24.93306063, y: -328632 },
        { x: 24.96639359, y: -320724 },
        { x: 24.99972656, y: -309897 },
        { x: 25.03305953, y: -299037 },
        { x: 25.0663925, y: -287012 },
        { x: 25.09972547, y: -271112 },
        { x: 25.13305844, y: -251565 },
        { x: 25.16639141, y: -228115 },
        { x: 25.19972438, y: -196063 },
        { x: 25.23305734, y: -12866 },
        { x: 25.26639031, y: 18579 },
        { x: 25.29972328, y: 49447 },
        { x: 25.33305625, y: 82908 },
        { x: 25.36638922, y: 118851 },
        { x: 25.39972219, y: 151178 },
        { x: 25.43305516, y: 180655 },
        { x: 25.46638813, y: 212182 },
        { x: 25.49972109, y: 245748 },
        { x: 25.53305406, y: 279960 },
        { x: 25.56638703, y: 254192 },
        { x: 25.59972, y: 236056 },
        { x: 25.63305297, y: 187749 },
        { x: 25.66638594, y: 137566 },
        { x: 25.69971891, y: 90102 },
        { x: 25.73305188, y: 49220 },
        { x: 25.76638484, y: 19554 },
        { x: 25.79971781, y: 2802 },
        { x: 25.83305078, y: -5866 },
        { x: 25.86638375, y: -4052 },
        { x: 25.89971672, y: -72738 },
        { x: 25.93304969, y: -73858 },
        { x: 25.96638266, y: -71429 },
        { x: 25.99971563, y: -66196 },
        { x: 26.03304859, y: -61285 },
        { x: 26.06638156, y: -52980 },
        { x: 26.09971453, y: -44017 },
        { x: 26.1330475, y: -33844 },
        { x: 26.16638047, y: -21784 },
        { x: 26.19971344, y: -10764 },
        { x: 26.23304641, y: 53398 },
        { x: 26.26637938, y: 63454 },
        { x: 26.29971234, y: 73520 },
        { x: 26.33304531, y: 83841 },
        { x: 26.36637828, y: 95348 },
        { x: 26.39971125, y: 109157 },
        { x: 26.43304422, y: 112486 },
        { x: 26.46637719, y: 81952 },
        { x: 26.49971016, y: 32877 },
        { x: 26.53304313, y: -8674 },
        { x: 26.56637609, y: -142772 },
        { x: 26.59970906, y: -164002 },
        { x: 26.63304203, y: -172011 },
        { x: 26.666375, y: -172730 },
        { x: 26.69970797, y: -166826 },
        { x: 26.73304094, y: -165404 },
        { x: 26.76637391, y: -163223 },
        { x: 26.79970688, y: -164199 },
        { x: 26.83303984, y: -165396 },
        { x: 26.86637281, y: -158922 },
        { x: 26.89970578, y: -51536 },
        { x: 26.93303875, y: -43291 },
        { x: 26.96637172, y: -33607 },
        { x: 26.99970469, y: -24368 },
        { x: 27.03303766, y: -10094 },
        { x: 27.06637063, y: 1756 },
        { x: 27.09970359, y: 10700 },
        { x: 27.13303656, y: 21937 },
        { x: 27.16636953, y: 33984 },
        { x: 27.1997025, y: 44721 },
        { x: 27.23303547, y: 25515 },
        { x: 27.26636844, y: 40434 },
        { x: 27.29970141, y: 40312 },
        { x: 27.33303438, y: 10904 },
        { x: 27.36636734, y: -27549 },
        { x: 27.39970031, y: -56749 },
        { x: 27.43303328, y: -73050 },
        { x: 27.46636625, y: -79920 },
        { x: 27.49969922, y: -77356 },
        { x: 27.53303219, y: -67350 },
        { x: 27.56636516, y: -157416 },
        { x: 27.59969813, y: -152836 },
        { x: 27.63303109, y: -148193 },
        { x: 27.66636406, y: -144741 },
        { x: 27.69969703, y: -137473 },
        { x: 27.73303, y: -129669 },
        { x: 27.76636297, y: -120564 },
        { x: 27.79969594, y: -107292 },
        { x: 27.83302891, y: -93661 },
        { x: 27.86636188, y: -82281 },
        { x: 27.89969484, y: -46446 },
        { x: 27.93302781, y: -33416 },
        { x: 27.96636078, y: -20727 },
        { x: 27.99969375, y: -11416 },
        { x: 28.03302672, y: 1452 },
        { x: 28.06635969, y: 15508 },
        { x: 28.09969266, y: 31950 },
        { x: 28.13302563, y: 40766 },
        { x: 28.16635859, y: 21682 },
        { x: 28.19969156, y: -20871 },
        { x: 28.23302453, y: -61284 },
        { x: 28.2663575, y: -85139 },
        { x: 28.29969047, y: -103866 },
        { x: 28.33302344, y: -110816 },
        { x: 28.36635641, y: -111775 },
        { x: 28.39968938, y: -103116 },
        { x: 28.43302234, y: -100790 },
        { x: 28.46635531, y: -99460 },
        { x: 28.49968828, y: -101370 },
        { x: 28.53302125, y: -99978 },
        { x: 28.56635422, y: -98864 },
        { x: 28.59968719, y: -91199 },
        { x: 28.63302016, y: -84036 },
        { x: 28.66635313, y: -75698 },
        { x: 28.69968609, y: -64388 },
        { x: 28.73301906, y: -55744 },
        { x: 28.76635203, y: -43326 },
        { x: 28.799685, y: -36660 },
        { x: 28.83301797, y: -27423 },
        { x: 28.86635094, y: -17471 },
        { x: 28.89968391, y: -9072 },
        { x: 28.93301688, y: 2644 },
        { x: 28.96634984, y: 16433 },
        { x: 28.99968281, y: 23405 },
        { x: 29.03301578, y: 0 },
      ],
      borderColor: 'black',
      pointRadius: 3,
      pointBackgroundColor: 'red',
      showLine: true,
      fill: false
    },
  ];
  public scatterChartType: ChartType = 'scatter';

constructor() { }

ngOnInit() {
  }
}
