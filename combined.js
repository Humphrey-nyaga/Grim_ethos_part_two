//An event listener for submission
document.getElementById('form_input').addEventListener('submit', submitForm);
function autoRefreshPage()
{
    window.location = window.location.href;
}
//setInterval('autoRefreshPage()', 10000);
// we declare the parameters we are getting from the input form as global
var region;
var region_name;
var chart;
var data_set;
var count_select;
function submitForm(e)
{
    e.preventDefault();
    data_set = document.getElementById('data_set').value;
    console.log("filtering by "+data_set);
    region = document.getElementById('region').value;
    chart = document.getElementById('charts').value;
    console.log("Region selEcted "+region);
    console.log("Chart selected "+chart);

    if(region == "County")
    {
        region_name = document.getElementById('my_counties').value;
        console.log("region name is "+region_name);

    }
    else if(region== "Sub_County")
    {
        region_name = document.getElementById('my_sub_counties').value;
        console.log("region name is "+region_name);
    }
    else if(region == "Ward")
    {
        region_name = document.getElementById('my_wards').value;
        console.log("region name is "+region_name);
    }
    else{
        region_name="kenya";
    }
    

    document.getElementById("my_button").disabled = true;
    if(data_set == "keph_level")
    {
      
        keph_getData();
    }
    else if(data_set == "facility_type")
    {
        console.log("something done")
        f_type_getData(); 
    }
    else if(data_set == "facility_type_category")
    {
        f_type_category_getData();
    }
    else if(data_set == "facility_owner_category")
    {
        f_owner_category_getData();
    }
    else if(data_set == "number_of_bed_and_cots")
    {
        bed_and_cots_getData();
    }
    else if(data_set == "number_and_operational_status")
    {
        number_and_operational_getData();
    }
    else if(data_set == "facility_owner")
    {
        f_owners_getData();
    }
    else{
        console.log("Nothing done");   
    }
    //reset the form
    document.getElementById("form_input").reset();
    return true;
}

            var level2 = 0;
            var level3 = 0;
            var level4 = 0;
            var level5 = 0;

        async function keph_getData(){
          
            const response = await fetch('kmfl.csv');
            const data = await response.text();
            // console.log(data);

           
            const rows = data.split('\n').slice(1);
            rows.forEach(elt => {
                const row = elt.split(',')
                const Code = row[0];
                // xlabels.push(Code);
                const Name = row[1];
                const Keph_level = row[4];
                const County = row[12];
                
                const Sub_county = row[14];
                const Ward = row[15];

                //console.log(Sub_county, Keph_level);

                if(region == 'County'){
                    if(County == region_name){
                   
                    if(Keph_level == 'Level 2'){
                        level2 = level2 + 1 ;
                    }
                     else if(Keph_level == 'Level 3'){
                        level3 = level3 + 1 ;
                    }
                     else if(Keph_level == 'Level 4'){
                        level4 = level4 + 1 ;
                    }
                     else{
                        level5 = level5 + 1 ;
                    }
                }

                }
                else if(region == 'Sub_County'){
                    if(Sub_county == region_name){
                  
                    if(Keph_level == 'Level 2'){
                        level2 = level2 + 1 ;
                    }
                     else if(Keph_level == 'Level 3'){
                        level3 = level3 + 1 ;
                    }
                     else if(Keph_level == 'Level 4'){
                        level4 = level4 + 1 ;
                    }
                     else{
                        level5 = level5 + 1 ;
                    }
                }
                }
                else if(region == 'Ward'){
                  if(Ward == region_name){
                    
                    if(Keph_level == 'Level 2'){
                        level2 = level2 + 1 ;
                    }
                     else if(Keph_level == 'Level 3'){
                        level3 = level3 + 1 ;
                    }
                     else if(Keph_level == 'Level 4'){
                        level4 = level4 + 1 ;
                    }
                     else{
                        level5 = level5 + 1 ;
                    }
                }
              }
                else{
                  if(Keph_level == 'Level 2'){
                    level2 = level2 + 1 ;
                }
                 else if(Keph_level == 'Level 3'){
                    level3 = level3 + 1 ;
                }
                 else if(Keph_level == 'Level 4'){
                    level4 = level4 + 1 ;
                }
                 else{
                    level5 = level5 + 1 ;
                }
                
                }
            })
        
        if(chart == "bar_graph")
        {
            //find maximum 
            var max = level2;
            if(level3 > max)
            {
              max = level3;
            }
            else if(level4 > max)
            {
              max = level4;
            }
            else if(level5 > max)
            {
              max = level5;
            }
            else 
            {

            }
            var title_name;
            var y_axis_text = "Number of Facilities";
            if(region_name == "kenya")
            {
               title_name = "Facilities distribution in Kenya based on KEPH Levels";
               
            }
            else{
              title_name = region_name+"  "+region+" Facilities distribution based on KEPH Levels";
             
            }
            
        
         max = max + 1;
         max = Math.ceil(max / 10) * 10;
      
                
                var chartData = {
                type: 'bar',
                "title":{  
                    "text": title_name  
                    }, 
                    "scale-y":{  
                      'min-value': 0,
                      'max-value': max,
                        
                        label: { /* Scale Title */
                        text: y_axis_text,
                        },
                        "items-overlap":true,  
                        "item":{  
                            "font-angle":-90,
                             "offset-x":"7px"
                            }

                        },
                        plot: {
                          styles: [ "blue", "green", "#800080", "red" ]
                         },
                    "scale-x":{  
                        label: { /* Scale Title */
                        text: "KEPH Levels",
                        },
                        labels: ["level2 ", "level3","level4", "level5"]
                        },
                series: [
                    { 
                        values: [level2, level3, level4, level5],
                        'background-color': "#008000"
                    },
                ]
                };
                zingchart.render({
                id: 'myChart',
                data: chartData,
                width: "80%"
                });
          }
          else if(chart == "pie_chart")
          {
            var title_name;
            var mytitle;
            if(region_name == "kenya")
            {
            
                mytitle = "Facilities distribution rate based on keph levels in Kenya";
            }
            else{
              title_name = region_name+"  "+region;
              mytitle = title_name+" Facilities distribution rate based on keph levels";
            }
              
            
             
            ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
            var myConfig = {
              type: "pie",
              plot: {
                borderColor: "#2B313B",
                borderWidth: 2,
                // slice: 90,
                valueBox: {
                  placement: 'out',
                  text: '%t\n%npv%',
                  fontFamily: "Open Sans"
                },
                tooltip: {
                  fontSize: '18',
                  fontFamily: "Open Sans",
                  padding: "5 10",
                  "text":"%t (%v)"
                },
                animation: {
                  effect: 2,
                  method: 5,
                  speed: 900,
                  sequence: 1,
                  delay: 50
                }
              },
      
              title: {
                fontColor: "#8e99a9",
                text: mytitle,
                align: "center",
                offsetX: 10,
                fontFamily: "Open Sans",
                fontSize: 20
              },
              plotarea: {
                margin: "20 0 0 0"
              },
            
              series: [{
                  values: [level2],
                  text: "Level 2 ",
                  backgroundColor: '#50ADF5',
                },
                {
                  values: [level3],
                  text: "Level 3",
                  backgroundColor: '#FF7965'
                },
                {
                  values: [level4],
                  text: 'Level 4',
                  backgroundColor: '#FFCB45'
                },
                {
                  text: 'Level 5',
                  values: [level5],
                  backgroundColor: '#6877e5'
                }
              ]
            };
         
            zingchart.render({
              id: 'mypieChart',
              data: myConfig,
              height: '100%',
              width: '100%'
            });
          }
          else{
              console.log("can't draw anything");
          }
            
        }
        //end of keph level

        //facility type start
        var pri_care_hosi = 0;
        var nurse_home = 0;
        var dispensary = 0;
        var basic_heal_center = 0;
        var med_center = 0;
        var med_clinic = 0;
        var comp_health_care = 0;
        var sec_care_hosi = 0;
        var nurse_and_maternity = 0;
        var lab = 0;

    async function f_type_getData(){
        const response = await fetch('kmfl.csv');
        const data = await response.text();
        // console.log(data);

       
        const rows = data.split('\n').slice(1);
        rows.forEach(elt => {
            const row = elt.split(',')
            const Code = row[0];
            // xlabels.push(Code);
            const Name = row[1];
            const Keph_level = row[4];
            const facility_type = row[5];
            const County = row[12];
            
            const Sub_county = row[14];
            const Ward = row[15];

            //console.log(Sub_county, Keph_level);

            if(region == 'County'){
                if(County == region_name){
                if(facility_type == 'Primary care hospitals'){
                    pri_care_hosi = pri_care_hosi + 1 ;
                }
                else if(facility_type == 'Dispensary'){
                    dispensary = dispensary + 1 ;
                }
                 else if(facility_type == 'Basic Health Centre'){
                    basic_heal_center = basic_heal_center + 1 ;
                }
                 else if(facility_type == 'Medical Clinic'){
                    med_center = med_center + 1 ;
                }
                else if(facility_type == 'Medical Center')
                {
                    med_clinic = med_clinic + 1;
                }
                else if(facility_type == 'Nursing Homes')
                {
                    nurse_home = nurse_home + 1;
                }
                else if(facility_type == 'Comprehensive health Centre')
                {
                    comp_health_care = comp_health_care + 1;
                }
                else if(facility_type == 'Secondary care hospitals')
                {
                    sec_care_hosi = sec_care_hosi + 1;
                }
                else if(facility_type == 'Laboratory')
                {
                    lab = lab + 1;
                }
                else if(facility_type == 'Nursing and Maternity Home')
                {
                    nurse_and_maternity = nurse_and_maternity + 1;
                }
              
                 else{
                    
                }
            }

            }
            else if(region == 'Sub_County'){
                if(Sub_county == region_name){
                    if(facility_type == 'Primary care hospitals'){
                        pri_care_hosi = pri_care_hosi + 1 ;
                    }
                    else if(facility_type == 'Dispensary'){
                        dispensary = dispensary + 1 ;
                    }
                     else if(facility_type == 'Basic Health Centre'){
                        basic_heal_center = basic_heal_center + 1 ;
                    }
                     else if(facility_type == 'Medical Clinic'){
                        med_center = med_center + 1 ;
                    }
                    else if(facility_type == 'Medical Center')
                    {
                        med_clinic = med_clinic + 1;
                    }
                    else if(facility_type == 'Nursing Homes')
                    {
                        nurse_home = nurse_home + 1;
                    }
                    else if(facility_type == 'Comprehensive health Centre')
                    {
                        comp_health_care = comp_health_care + 1;
                    }
                    else if(facility_type == 'Secondary care hospitals')
                    {
                        sec_care_hosi = sec_care_hosi + 1;
                    }
                    else if(facility_type == 'Laboratory')
                    {
                        lab = lab + 1;
                    }
                    else if(facility_type == 'Nursing and Maternity Home')
                    {
                        nurse_and_maternity = nurse_and_maternity + 1;
                    }
                  
                     else{
                        
                    }
            }
            }
            else if(region == 'Ward'){
              if(Ward == region_name){
                if(facility_type == 'Primary care hospitals'){
                    pri_care_hosi = pri_care_hosi + 1 ;
                }
                else if(facility_type == 'Dispensary'){
                    dispensary = dispensary + 1 ;
                }
                 else if(facility_type == 'Basic Health Centre'){
                    basic_heal_center = basic_heal_center + 1 ;
                }
                 else if(facility_type == 'Medical Clinic'){
                    med_center = med_center + 1 ;
                }
                else if(facility_type == 'Medical Center')
                {
                    med_clinic = med_clinic + 1;
                }
                else if(facility_type == 'Nursing Homes')
                {
                    nurse_home = nurse_home + 1;
                }
                else if(facility_type == 'Comprehensive health Centre')
                {
                    comp_health_care = comp_health_care + 1;
                }
                else if(facility_type == 'Secondary care hospitals')
                {
                    sec_care_hosi = sec_care_hosi + 1;
                }
                else if(facility_type == 'Laboratory')
                {
                    lab = lab + 1;
                }
                else if(facility_type == 'Nursing and Maternity Home')
                {
                    nurse_and_maternity = nurse_and_maternity + 1;
                }
              
                 else{
                    
                }
        }
          }
            else{
                    if(facility_type == 'Primary care hospitals'){
                        pri_care_hosi = pri_care_hosi + 1 ;
                    }
                    else if(facility_type == 'Dispensary'){
                        dispensary = dispensary + 1 ;
                    }
                     else if(facility_type == 'Basic Health Centre'){
                        basic_heal_center = basic_heal_center + 1 ;
                    }
                     else if(facility_type == 'Medical Clinic'){
                        med_center = med_center + 1 ;
                    }
                    else if(facility_type == 'Medical Center')
                    {
                        med_clinic = med_clinic + 1;
                    }
                    else if(facility_type == 'Nursing Homes')
                    {
                        nurse_home = nurse_home + 1;
                    }
                    else if(facility_type == 'Comprehensive health Centre')
                    {
                        comp_health_care = comp_health_care + 1;
                    }
                    else if(facility_type == 'Secondary care hospitals')
                    {
                        sec_care_hosi = sec_care_hosi + 1;
                    }
                    else if(facility_type == 'Laboratory')
                    {
                        lab = lab + 1;
                    }
                    else if(facility_type == 'Nursing and Maternity Home')
                    {
                        nurse_and_maternity = nurse_and_maternity + 1;
                    }
                  
                     else{
                        
                    }
            }
        })

        //calculate maximum
        var f_t_max = dispensary;
        if(basic_heal_center > f_t_max)
        {
          f_t_max = basic_heal_center;
        }
        else if(comp_health_care > f_t_max)
        {
          f_t_max = comp_health_care;
        }
        else if(nurse_and_maternity > f_t_max)
        {
          f_t_max = nurse_and_maternity;
        }
        else if(nurse_home > f_t_max)
        {
          f_t_max = nurse_home;
        }
        else if(lab > f_t_max)
        {
          f_t_max = lab;
        }
        else if(pri_care_hosi > f_t_max)
        {
          f_t_max = pri_care_hosi;
        }
        else if(med_center > f_t_max)
        {
          f_t_max = med_center;
        }
        else if(med_clinic > f_t_max)
        {
          f_t_max = med_clinic; 
        }
        else if(sec_care_hosi > f_t_max)
        {
          f_t_max = sec_care_hosi;
        }
        else{

        }

        f_t_max = f_t_max + 1;
        f_t_max = Math.ceil((f_t_max )/ 10) * 10;
                    
    if(chart == "bar_graph")
    {
      var title_name;
      var y_axis_text = "Number of Facilities";
      if(region_name == "kenya")
      {
         title_name = "Facilities distribution in Kenya based on facility types";
      }
      else{
        title_name = region_name+"  "+region+" Facilities distribution based on facility types";
         
      }
            var chartData = {
            type: 'bar',
            "title":{  
                "text": title_name  
                }, 
                "scale-y":{  
                  'min-value': 0,
                   'max-value': f_t_max,
                    label: { /* Scale Title */
                    text: y_axis_text,
                    },
                    "items-overlap":true,  
                    "item":{  
                        "font-angle":-90,
                         "offset-x":"7px"
                        }
                    },
                    plot: {
                      styles: [ "blue", "green", "#800080", "#F535AA","yellow", "brown", "#151B54", "orange", "#6AFB92","red" ]
                     },
                "scale-x":{  
                    label: { /* Scale Title */
                    text: "Facility types",
                    },
                    labels: ["Dispensaries", "Medical <br> Centers ", "Medical <br> Clinics",
                    "Nursing <br> Homes", "Primary <br> Care Hospital", "Basic <br> health centers", 
                    "Comprehensive  <br> health Centre","Nursing and  <br> Maternity Homes", "Laboratory", "Secondary <br> care hospitals"]
                    
                    },
            series: [
                { 
                    values: [dispensary, med_center, med_clinic, nurse_home, pri_care_hosi, 
                        basic_heal_center, comp_health_care, nurse_and_maternity, lab, sec_care_hosi],
                    'background-color': "#6666FF"
                },
            ]
            };
            zingchart.render({
            id: 'myChart',
            data: chartData,
            width: "90%"
            });
        }
        else if(chart == "pie_chart")
        {
            
            var title_name;
            var mytitle;
            if(region_name == "kenya")
            {
            
                mytitle = "Facilities distribution rate based on Facility Type in Kenya";
            }
            else{
              title_name = region_name+"  "+region;
              mytitle = title_name+" Facility Type distribution rate";
            }
            
            ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
            var myConfig = {
              type: "pie",
              plot: {
                borderColor: "#2B313B",
                borderWidth: 2,
                // slice: 90,
                valueBox: {
                  placement: 'out',
                  text: '%t\n%npv%',
                  fontFamily: "Open Sans"
                },
                tooltip: {
                  fontSize: '18',
                  fontFamily: "Open Sans",
                  padding: "5 10",
                  "text":"%t (%v)"
                },
                animation: {
                  effect: 2,
                  method: 5,
                  speed: 900,
                  sequence: 1,
                  delay: 50
                }
              },
      
              title: {
                fontColor: "#8e99a9",
                text: mytitle,
                align: "center",
                offsetX: 10,
                fontFamily: "Open Sans",
                fontSize: 20
              },
              plotarea: {
                margin: "20 0 0 0"
              },
              series: [{
                  values: [dispensary],
                  text: "Dispensaries",
                  backgroundColor: '#50ADF5',
                  detached: true
                },
                {
                    text: 'primary care Hospitals',
                    values: [pri_care_hosi],
                    backgroundColor: '#7D0552',
                    detached: true
                  },
                {
                    text: 'Nursing and Maternity Homes',
                    values: [nurse_and_maternity],
                    backgroundColor: '#FF69B4'
                  },
                {
                    values: [med_center],
                    text: "Medical centers",
                    backgroundColor: '#FF7965',
                    detached: true
                  },
                  {
                    text: 'Secondary care hospitals',
                    values: [sec_care_hosi],
                    backgroundColor: '#9400D3'
                  },
                {
                    values: [med_clinic],
                    text: 'Medical clinics',
                    backgroundColor: '#FFCB45',
                    detached: true
                  },
              
                 
                
                  {
                    text: 'Comprehensive health Centres',
                    values: [comp_health_care],
                    backgroundColor: '#191970'
                  },
                  {
                    text: 'Nursing Homes',
                    values: [nurse_home],
                    backgroundColor: '#6877e5',
                    detached: true
                  },

                  {
                    text: 'Basic Health Centers',
                    values: [basic_heal_center],
                    backgroundColor: '#6FB07F',
                    detached: true
                  },

            
                {
                  text: 'Laboratories',
                  values: [lab],
                  backgroundColor: '#696969'
                }
              ]
            };
         
            zingchart.render({
              id: 'mypieChart',
              data: myConfig,
              height: '100%',
              width: '100%'
            });
        }
        else
        {
            console.log("Nothing done");
        }
        
    }
    //end of facility types

    //start of F_category
    var HOSPITAL = 0;
    var NURSE_HOMES = 0;
    var DISPENSARY = 0;
    var HEALTH_CENTER = 0;
    var MED_CENTER = 0;
    var MED_CLINIC = 0;

async function f_type_category_getData(){
    const response = await fetch('kmfl.csv');
    const data = await response.text();
    // console.log(data);

   
    const rows = data.split('\n').slice(1);
    rows.forEach(elt => {
        const row = elt.split(',')
        const Code = row[0];
        // xlabels.push(Code);
        const Name = row[1];
        const Keph_level = row[4];
        const facility_type = row[5];
        const facility_type_category = row[6];
        const County = row[12];
        
        const Sub_county = row[14];
        const Ward = row[15];

        //console.log(Sub_county, Keph_level);

        if(region == 'County'){
            if(County == region_name){
                if(facility_type_category == 'HOSPITALS'){
                    HOSPITAL = HOSPITAL + 1 ;
                }
                else if(facility_type_category == 'DISPENSARY'){
                    DISPENSARY = DISPENSARY + 1 ;
                }
                 else if(facility_type_category == 'HEALTH CENTRE'){
                    HEALTH_CENTER = HEALTH_CENTER + 1 ;
                }
                 else if(facility_type_category == 'MEDICAL CLINIC'){
                    MED_CENTER = MED_CENTER + 1 ;
                }
                else if(facility_type_category == 'MEDICAL CENTER')
                {
                    MED_CLINIC = MED_CLINIC + 1;
                }
                else if(facility_type_category == 'NURSING HOME')
                {
                    NURSE_HOMES = NURSE_HOMES + 1;
                }
                 else{
                    
                }
        }

        }
        else if(region == 'Sub_County'){
            if(Sub_county == region_name){
                if(facility_type_category == 'HOSPITALS'){
                    HOSPITAL = HOSPITAL + 1 ;
                }
                else if(facility_type_category == 'DISPENSARY'){
                    DISPENSARY = DISPENSARY + 1 ;
                }
                 else if(facility_type_category == 'HEALTH CENTRE'){
                    HEALTH_CENTER = HEALTH_CENTER + 1 ;
                }
                 else if(facility_type_category == 'MEDICAL CLINIC'){
                    MED_CENTER = MED_CENTER + 1 ;
                }
                else if(facility_type_category == 'MEDICAL CENTER')
                {
                    MED_CLINIC = MED_CLINIC + 1;
                }
                else if(facility_type_category == 'NURSING HOME')
                {
                    NURSE_HOMES = NURSE_HOMES + 1;
                }
                 else{
                    
                }
        }
        }
        else if(region == 'Ward'){
          if(Ward == region_name){
            if(facility_type_category == 'HOSPITALS'){
                HOSPITAL = HOSPITAL + 1 ;
            }
            else if(facility_type_category == 'DISPENSARY'){
                DISPENSARY = DISPENSARY + 1 ;
            }
             else if(facility_type_category == 'HEALTH CENTRE'){
                HEALTH_CENTER = HEALTH_CENTER + 1 ;
            }
             else if(facility_type_category == 'MEDICAL CLINIC'){
                MED_CENTER = MED_CENTER + 1 ;
            }
            else if(facility_type_category == 'MEDICAL CENTER')
            {
                MED_CLINIC = MED_CLINIC + 1;
            }
            else if(facility_type_category == 'NURSING HOME')
            {
                NURSE_HOMES = NURSE_HOMES + 1;
            }
             else{
                
            }
    }
      }
        else{
                if(facility_type_category == 'HOSPITALS'){
                    HOSPITAL = HOSPITAL + 1 ;
                }
                else if(facility_type_category == 'DISPENSARY'){
                    DISPENSARY = DISPENSARY + 1 ;
                }
                 else if(facility_type_category == 'HEALTH CENTRE'){
                    HEALTH_CENTER = HEALTH_CENTER + 1 ;
                }
                 else if(facility_type_category == 'MEDICAL CLINIC'){
                    MED_CENTER = MED_CENTER + 1 ;
                }
                else if(facility_type_category == 'MEDICAL CENTER')
                {
                    MED_CLINIC = MED_CLINIC + 1;
                }
                else if(facility_type_category == 'NURSING HOME')
                {
                    NURSE_HOMES = NURSE_HOMES + 1;
                }
                 else{
                    
                }
        }
    })
                //determine maximum
                var f_t_c_max = DISPENSARY;
                if(HEALTH_CENTER > f_t_c_max)
                {
                  f_t_c_max = HEALTH_CENTER;
                }
                else if(HOSPITAL > f_t_c_max)
                {
                  f_t_c_max = HOSPITAL;
                }
                else if(MED_CENTER > f_t_c_max)
                {
                  f_t_c_max = MED_CENTER;
                }
                else if(MED_CLINIC > f_t_c_max)
                {
                  f_t_c_max = MED_CLINIC;
                }
                else{

                }

                f_t_c_max = f_t_c_max + 1;
                f_t_c_max = Math.ceil((f_t_c_max )/ 10) * 10;
            

if(chart == "bar_graph")
{

  var title_name;
      var y_axis_text = "Number of Facilities";
      if(region_name == "kenya")
      {
         title_name = "Facilities distribution in Kenya based on <br>  Facility types Categories";
      }
      else{
        title_name = region_name+"  "+region+" Facilities distribution based on Facility types Categories";
    
      } 
        var chartData = {
        type: 'bar',
        "title":{  
            "text": title_name  
            }, 
            "scale-y":{ 
              'min-value': 0,
                   'max-value': f_t_c_max, 
                label: { /* Scale Title */
                text: y_axis_text,
                },
                "items-overlap":true,  
                "item":{  
                    "font-angle":-90,
                     "offset-x":"7px"
                    }
                },
                plot: {
                  styles: [ "#151B54", "#F535AA","yellow", "brown",  "#6AFB92","orange" ]
                 },
            "scale-x":{  
                label: { /* Scale Title */
                text: "Facility types Categories",
                },
                labels: ["DISPENSARIES", "MEDICAL <br> CENTERS ", "MEDICAL <br> CLINIC","NURSING <br> HOMES", "HEALTH <br> CENTER ", "HOSPITALS"]
                
                },
        series: [
            { 
                values: [DISPENSARY, MED_CENTER, MED_CLINIC, NURSE_HOMES, HEALTH_CENTER, HOSPITAL]
            },
        ]
        };
        zingchart.render({
        id: 'myChart',
        data: chartData,
        width: "80%"
        });
    }
    else if(chart == "pie_chart")
    {
      var title_name;
      var mytitle;
      if(region_name == "kenya")
      {
          mytitle = "Facilities distribution rate based on Facility Type Categories in Kenya";
      }
      else{
        title_name = region_name+"  "+region;
        mytitle = title_name+" Facility Type Categories distribution rate";
      }
      
        ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
        var myConfig = {
          type: "pie",
          plot: {
            borderColor: "#2B313B",
            borderWidth: 2,
            // slice: 90,
            valueBox: {
              placement: 'out',
              text: '%t\n%npv%',
              fontFamily: "Open Sans"
            },
            tooltip: {
              fontSize: '18',
              fontFamily: "Open Sans",
              padding: "5 10",
              "text":"%t (%v)"
            },
            animation: {
              effect: 2,
              method: 5,
              speed: 900,
              sequence: 1,
              delay: 50
            }
          },
  
          title: {
            fontColor: "#8e99a9",
            text: mytitle,
            align: "center",
            offsetX: 10,
            fontFamily: "Open Sans",
            fontSize: 20
          },
          plotarea: {
            margin: "20 0 0 0"
          },

          series: [{
              values: [HOSPITAL],
              text: "HOSPITALS",
              backgroundColor: '#50ADF5',
            },
            {
              values: [DISPENSARY],
              text: "DISPENSARIES",
              backgroundColor: '#FF7965'
            },
            {
              values: [HEALTH_CENTER],
              text: 'HEALTH CENTRES',
              backgroundColor: '#FFCB45'
            },
            {
              text: 'MEDICAL CLINICS',
              values: [MED_CLINIC],
              backgroundColor: '#6877e5'
            },
            {
              text: 'MEDICAL CENTERS',
              values: [MED_CENTER],
              backgroundColor: '#7D0552'
            },
            {
              text: 'NURSING HOMES',
              values: [NURSE_HOMES],
              backgroundColor: '#6FB07F'
            }
          ]
        };
     
        zingchart.render({
          id: 'mypieChart',
          data: myConfig,
          height: '100%',
          width: '100%'
        });
    }
    else
    {
        console.log("Nothing done");
    }
    
}
//end of f_category


//start of owner category

    var ministry_of_health = 0;
    var faith_based = 0;
    var non_governmental = 0;
    var private_practice = 0;
    

async function f_owner_category_getData(){
    const response = await fetch('kmfl.csv');
    const data = await response.text();
    // console.log(data);
    const rows = data.split('\n').slice(1);
    rows.forEach(elt => {
        const row = elt.split(',')
        const facility_owner_category = row[8];
        const County = row[12];
        
        const Sub_county = row[14];
        const Ward = row[15];

        if(region == 'County'){
            if(County == region_name){
                if(facility_owner_category == 'Ministry of Health'){
                    ministry_of_health = ministry_of_health + 1 ;
                }
                else if(facility_owner_category == 'Private Practice'){
                    private_practice = private_practice + 1 ;
                }
                 else if(facility_owner_category == 'Faith Based Organization'){
                    faith_based = faith_based + 1 ;
                }
                 else if(facility_owner_category == 'Non-Governmental Organizations'){
                    non_governmental = non_governmental + 1 ;
                }
    
                 else{
                    
                }
        }

        }
        else if(region == 'Sub_County'){
            if(Sub_county == region_name){
                if(facility_owner_category == 'Ministry of Health'){
                    ministry_of_health = ministry_of_health + 1 ;
                }
                else if(facility_owner_category == 'Private Practice'){
                    private_practice = private_practice + 1 ;
                }
                 else if(facility_owner_category == 'Faith Based Organization'){
                    faith_based = faith_based + 1 ;
                }
                 else if(facility_owner_category == 'Non-Governmental Organizations'){
                    non_governmental = non_governmental + 1 ;
                }
    
                 else{
                    
                }
        }
        }
        else if(region == 'Ward'){
          if(Ward == region_name){
            if(facility_owner_category == 'Ministry of Health'){
                ministry_of_health = ministry_of_health + 1 ;
            }
            else if(facility_owner_category == 'Private Practice'){
                private_practice = private_practice + 1 ;
            }
             else if(facility_owner_category == 'Faith Based Organization'){
                faith_based = faith_based + 1 ;
            }
             else if(facility_owner_category == 'Non-Governmental Organizations'){
                non_governmental = non_governmental + 1 ;
            }

             else{
                
            }
    }
      }
        else{
            
                if(facility_owner_category == 'Ministry of Health'){
                    ministry_of_health = ministry_of_health + 1 ;
                }
                else if(facility_owner_category == 'Private Practice'){
                    private_practice = private_practice + 1 ;
                }
                 else if(facility_owner_category == 'Faith Based Organization'){
                    faith_based = faith_based + 1 ;
                }
                 else if(facility_owner_category == 'Non-Governmental Organizations'){
                    non_governmental = non_governmental + 1 ;
                }
    
                 else{
                    
                }
        }
    })
            //calculate maximum
            var f_owner_c_max = ministry_of_health;
            if(private_practice > f_owner_c_max)
            {
              f_owner_c_max = private_practice;
            }
            else if(faith_based > f_owner_c_max)
            {
              f_owner_c_max = faith_based;
            }
            else if(non_governmental > f_owner_c_max)
            {
              f_owner_c_max = non_governmental;
            }
            else{

            }

            f_owner_c_max = f_owner_c_max + 1;
            f_owner_c_max = Math.ceil((f_owner_c_max )/ 10) * 10;

if(chart == "bar_graph")
{
  var title_name;
  var y_axis_text = "Number of Facilities";
  if(region_name == "kenya")
  {
     title_name = "Facilities distribution in Kenya based on <br>  Facility owner Categories";
      
  }
  else{
    title_name = region_name+"  "+region+" Facilities distribution  <br> based on Facility owner Categories ";
    
  }

        var chartData = {
        type: 'bar',
        "title":{  
            "text": title_name  
            }, 
            "scale-y":{  
              'min-value': 0,
     'max-value': f_owner_c_max,
                label: { /* Scale Title */
                text: y_axis_text,
                },
                "items-overlap":true,  
      "item":{  
          "font-angle":-90,
           "offset-x":"7px"
          }
                },
                plot: {
                  styles: [ "red", "green", "#800080", "#F535AA" ]
                 },
            
            "scale-x":{  
                label: { /* Scale Title */
                text: "Facility Owner Categories",
                },
                labels: ["Ministry  <br> of Health","Private <br> Practice", "Faith Based <br> Organization", "Non-Governmental <br> Organizations"]
                
                },
        series: [
            { 
                values: [ministry_of_health, private_practice, faith_based, non_governmental],
                'background-color': "#6666FF"
            },
        ]
        };
        zingchart.render({
        id: 'myChart',
        data: chartData,
        width: "80%"
        });
    }
    else if(chart == "pie_chart")
    {
      var title_name;
      var mytitle;
      if(region_name == "kenya")
      {
      
          mytitle = "Facilities distribution rate based on Facility Owner Categories in Kenya";
      }
      else{
        title_name = region_name+"  "+region;
        mytitle = title_name+" Facilities  distribution rate based on Facility Owner Categories";
      }
      
        ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
        var myConfig = {
          type: "pie",
          plot: {
            borderColor: "#2B313B",
            borderWidth: 2,
            // slice: 90,
            valueBox: {
              placement: 'out',
              text: '%t\n%npv%',
              fontFamily: "Open Sans"
            },
            tooltip: {
              fontSize: '18',
              fontFamily: "Open Sans",
              padding: "5 10",
              "text":"%t (%v)"
            },
            animation: {
              effect: 2,
              method: 5,
              speed: 900,
              sequence: 1,
              delay: 50
            }
          },
  
          title: {
            fontColor: "#8e99a9",
            text: mytitle,
            align: "center",
            offsetX: 10,
            fontFamily: "Open Sans",
            fontSize: 20
          },
          plotarea: {
            margin: "20 0 0 0"
          },

          series: [{
              values: [non_governmental],
              text: "Non-Governmental Organizations",
              backgroundColor: '#50ADF5',
            },
            {
              values: [ministry_of_health],
              text: "Ministry of Health",
              backgroundColor: '#FF7965'
            },
            {
              values: [private_practice],
              text: 'Private Practice',
              backgroundColor: '#FFCB45'
            },
           
            {
              text: 'Faith Based Organizations',
              values: [faith_based],
              backgroundColor: '#6FB07F'
            }
          ]
        };
     
        zingchart.render({
          id: 'mypieChart',
          data: myConfig,
          height: '100%',
          width: '100%'
        });
    }
    else
    {
        console.log("Nothing done");
    }
    
}
//end of facility owner category

//start of beds and cots

var f_total = 0;
var f_operational = 0;
var num_of_beds = 0;
var num_of_cots = 0;

async function bed_and_cots_getData(){
const response = await fetch('kmfl.csv');
const data = await response.text();
// console.log(data);


const rows = data.split('\n').slice(1);
rows.forEach(elt => {
    const row = elt.split(',')
    const Code = row[0];
    // xlabels.push(Code);
    const Name = row[1];
    const beds = row[10];
    const cots = row[11];
    const operation = row[16];
    const Keph_level = row[4];
    const County = row[12];
    
    const Sub_county = row[14];
    const Ward = row[15];

    //console.log(Sub_county, Keph_level);

    if(region == 'County'){
        if(County == region_name){
            f_total = f_total + 1;
            //increment cots
            if(isNaN(cots)){
               
             }else{
            
                num_of_cots = num_of_cots + parseInt(cots) ;
                
             }
             //increment operational facilities
             if(operation == "Operational")
             {
                f_operational = f_operational + 1;
             }
            
             //increment beds
             if(isNaN(beds)){
               
             }else{
                num_of_beds = num_of_beds + parseInt(beds);
             }
    }

    }
    else if(region == 'Sub_County'){
        if(Sub_county == region_name){
            f_total = f_total + 1;
            //increment cots
            if(isNaN(cots)){
               
             }else{
                num_of_cots = num_of_cots + parseInt(cots) ;
             }
             //increment operational facilities
             if(operation == "Operational")
             {
                f_operational = f_operational + 1;
             }
            
             //increment beds
             if(isNaN(beds)){
               
             }else{
                num_of_beds = num_of_beds + parseInt(beds);
             }
    }
    }
    else if(region == 'Ward'){
      if(Ward == region_name){
        f_total = f_total + 1;
        
        
        //increment cots
        if(isNaN(cots)){
           
         }else{
            num_of_cots = num_of_cots + parseInt(cots) ;
         }
         //increment operational facilities
         if(operation == "Operational")
         {
            f_operational = f_operational + 1;
         }
        
         //increment beds
         if(isNaN(beds)){
           
         }else{
            num_of_beds = num_of_beds + parseInt(beds);
         }
}
  }
    else{
            f_total = f_total + 1;
            //increment cots
            if(isNaN(cots)){
               
             }else{
                num_of_cots = num_of_cots + parseInt(cots) ;
             }
             //increment operational facilities
             if(operation == "Operational")
             {
                f_operational = f_operational + 1;
             }
            
             //increment beds
             if(isNaN(beds)){
               
             }else{
                num_of_beds = num_of_beds + parseInt(beds);
             }
    
    }
})
            var beds_cots_max = num_of_beds;
            if(num_of_cots > beds_cots_max)
            {
              beds_cots_max = num_of_cots;
            }
            else{

            }

            beds_cots_max = beds_cots_max + 1;
            beds_cots_max = Math.ceil((beds_cots_max )/ 10) * 10;

if(chart == "bar_graph")
{
  var title_name;
  var y_axis_text ="Number of Beds and cots";
  if(region_name == "kenya")
  {
     title_name = "Number of Beds and Cots in Kenya ";
    
  }
  else{
    title_name = "Number of Beds and Cots in "+region_name+"  "+region;
     
  }

    var chartData = {
    type: 'bar',
    "title":{  
        "text": title_name  
        }, 
        "scale-y":{ 
          'min-value': 0,
          'max-value': beds_cots_max, 
            label: { // Scale Title 
            text: y_axis_text,
            },
            "items-overlap":true,  
            "item":{  
                "font-angle":-90,
                 "offset-x":"7px"
                }
            
            },
            plot: {
              styles: [ "blue", "green"]
             },
        "scale-x":{  
            label: { // Scale Title 
            text: "Bed and cots in "+f_operational+" Operational facilities"
            },
            labels: ["Beds", "Cots"]
            },
    series: [
        { 
            values: [num_of_beds, num_of_cots],
            'background-color': "#6666FF"
        },
    ]
    };
    zingchart.render({
    id: 'myChart',
    data: chartData,
    width: "80%"
    });
}
else if(chart == "pie_chart")
{
  var title_name;
  var mytitle;
  if(region_name == "kenya")
  {
  
      mytitle = "Beds and Cots distribution in Kenya";
  }
  else{
    title_name = region_name+"  "+region;
    mytitle = "Beds and Cots distribution in "+title_name;
  }

ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
var myConfig = {
  type: "pie",
  plot: {
    borderColor: "#2B313B",
    borderWidth: 2,
    // slice: 90,
    valueBox: {
      placement: 'out',
      text: '%t\n%npv%',
      fontFamily: "Open Sans"
    },
    tooltip: {
      fontSize: '18',
      fontFamily: "Open Sans",
      padding: "5 10",
      "text":"%t (%v)"
    },
    animation: {
      effect: 2,
      method: 5,
      speed: 900,
      sequence: 1,
      delay: 50
    }
  },

  title: {
    fontColor: "#8e99a9",
    text: mytitle,
    align: "center",
    offsetX: 10,
    fontFamily: "Open Sans",
    fontSize: 20
  },
  plotarea: {
    margin: "20 0 0 0"
  },

  series: [{
      values: [num_of_beds],
      text: "Beds ",
      backgroundColor: '#50ADF5',
    },
    {
      values: [num_of_cots],
      text: "Cots",
      backgroundColor: '#FF7965'
    }

  ]
};

zingchart.render({
  id: 'mypieChart',
  data: myConfig,
  height: '100%',
  width: '100%'
});
}
else{
  console.log("can't draw anything");
}

}
//end of number of beds and cots

// start of number of facilities 

async function number_and_operational_getData(){
    const response = await fetch('kmfl.csv');
    const data = await response.text();
    // console.log(data);
    
    
    const rows = data.split('\n').slice(1);
    rows.forEach(elt => {
        const row = elt.split(',')
        const Code = row[0];
        // xlabels.push(Code);
        const Name = row[1];
        const beds = row[10];
        const cots = row[11];
        const operation = row[16];
        const Keph_level = row[4];
        const County = row[12];
        
        const Sub_county = row[14];
        const Ward = row[15];
    
        //console.log(Sub_county, Keph_level);
    
        if(region == 'County'){
            if(County == region_name){
                f_total = f_total + 1;
                //increment cots
                if(isNaN(cots)){
                   
                 }else{
                
                    num_of_cots = num_of_cots + parseInt(cots) ;
                    
                 }
                 //increment operational facilities
                 if(operation == "Operational")
                 {
                    f_operational = f_operational + 1;
                 }
                
                 //increment beds
                 if(isNaN(beds)){
                   
                 }else{
                    num_of_beds = num_of_beds + parseInt(beds);
                 }
        }
    
        }
        else if(region == 'Sub_County'){
            if(Sub_county == region_name){
                f_total = f_total + 1;
                //increment cots
                if(isNaN(cots)){
                   
                 }else{
                    num_of_cots = num_of_cots + parseInt(cots) ;
                 }
                 //increment operational facilities
                 if(operation == "Operational")
                 {
                    f_operational = f_operational + 1;
                 }
                
                 //increment beds
                 if(isNaN(beds)){
                   
                 }else{
                    num_of_beds = num_of_beds + parseInt(beds);
                 }
        }
        }
        else if(region == 'Ward'){
          if(Ward == region_name){
            f_total = f_total + 1;
 
            //increment cots
            if(isNaN(cots)){
               
             }else{
                num_of_cots = num_of_cots + parseInt(cots) ;
             }
             //increment operational facilities
             if(operation == "Operational")
             {
                f_operational = f_operational + 1;
             }
            
             //increment beds
             if(isNaN(beds)){
               
             }else{
                num_of_beds = num_of_beds + parseInt(beds);
             }
    }
      }
        else{
                f_total = f_total + 1;
                
                
                //increment cots
                if(isNaN(cots)){
                   
                 }else{
                    num_of_cots = num_of_cots + parseInt(cots) ;
                 }
                 //increment operational facilities
                 if(operation == "Operational")
                 {
                    f_operational = f_operational + 1;
                 }
                
                 //increment beds
                 if(isNaN(beds)){
                   
                 }else{
                    num_of_beds = num_of_beds + parseInt(beds);
                 }
        }
    })

        var total_max = f_total;
        total_max = total_max + 1;
        total_max = Math.ceil((total_max )/ 10) * 10;
    
    if(chart == "bar_graph")
    {
      var title_name;
      var y_axis_text ="Number of Facilities";
      if(region_name == "kenya")
      {
         title_name = "Facilities distribution in Kenya based on <br> number of facilities and operational status";
        
      }
      else{
        title_name = "Facilities distribution in "+region_name+"  "+region+" based on  <br> number of facilities and operational status";
         
      }
        var non_operational_f = f_total - f_operational;
        var chartData = {
        type: 'bar',
        "title":{  
            "text": title_name  
            }, 
            "scale-y":{ 
              'min-value': 0,
              'max-value': total_max, 
                label: { // Scale Title 
                text: y_axis_text,
                },
                "items-overlap":true,  
                "item":{  
                    "font-angle":-90,
                     "offset-x":"7px"
                    }
                },
                plot: {
                  styles: [ "#6AFB92", "green",  "red" ]
                 },
            "scale-x":{  
                label: { // Scale Title 
                text: "Total facilities, Operational facilities and non_operational"
                },
                labels: ["Total <br> Facilities", "Operational <br> Facilities", "Non_Operational <br> Facilities"]
                },
        series: [
            { 
                values: [f_total, f_operational, non_operational_f],
                'background-color': "#6666FF"
            },
        ]
        };
        zingchart.render({
        id: 'myChart',
        data: chartData,
        width: "80%"
        });
    }
    else if(chart == "pie_chart")
    {
      var title_name;
      var mytitle;
      if(region_name == "kenya")
      {
          mytitle = "Facilities distribution rate based on Number of <br> Facilities and operational status in Kenya";
      }
      else{
        title_name = region_name+"  "+region;
        mytitle = title_name+" Facilities distribution rate based on Number of <br> Facilities and operational status";
      }
    var non_operational_f = f_total - f_operational;
    ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
    var myConfig = {
      type: "pie",
      plot: {
        borderColor: "#2B313B",
        borderWidth: 2,
        // slice: 90,
        valueBox: {
          placement: 'out',
          text: '%t\n%npv%',
          fontFamily: "Open Sans"
        },
        tooltip: {
          fontSize: '18',
          fontFamily: "Open Sans",
          padding: "5 10",
          "text":"%t (%v)"
        },
        animation: {
          effect: 2,
          method: 5,
          speed: 900,
          sequence: 1,
          delay: 50
        }
      },
    
      title: {
        fontColor: "#8e99a9",
        text: mytitle,
        align: "center",
        offsetX: 10,
        fontFamily: "Open Sans",
        fontSize: 20
      },
      plotarea: {
        margin: "20 0 0 0"
      },
    
      series: [{
          values: [f_operational],
          text: "Operational ",
          backgroundColor: '#50ADF5',
        },
        {
          values: [non_operational_f],
          text: "Not operational",
          backgroundColor: '#FF7965'
        }
    
      ]
    };
    
    zingchart.render({
      id: 'mypieChart',
      data: myConfig,
      height: '100%',
      width: '100%'
    });
    }
    else{
      console.log("can't draw anything");
    }
    
    }

//end of number of beds and cots

//start of facility owner

var min_health = 0;
var catholic = 0;
var christian = 0;
var other_faith = 0;
var other_owners = 0;
var pp_academic = 0;
var pp_general = 0;
var pp_nurse = 0;
var pp_clinical = 0;
var non_government = 0;

async function f_owners_getData(){
const response = await fetch('kmfl.csv');
const data = await response.text();
// console.log(data);


const rows = data.split('\n').slice(1);
rows.forEach(elt => {
    const row = elt.split(',')
    const Code = row[0];
    // xlabels.push(Code);
    
    const f_owner = row[7];
    const facility_type = row[5];
    const County = row[12];
    
    const Sub_county = row[14];
    const Ward = row[15];

    //console.log(Sub_county, Keph_level);

    if(region == 'County'){
        if(County == region_name){
        if(f_owner == 'Ministry of Health'){
            min_health = min_health + 1 ;
        }
        else if(f_owner == 'Private Practice - Private Institution Academic'){
            pp_academic = pp_academic + 1 ;
        }
         else if(f_owner == 'Kenya Episcopal Conference-Catholic Secretariat'){
            catholic = catholic + 1 ;
        }
         else if(f_owner == 'Private Practice - Nurse / Midwifery'){
            pp_nurse = pp_nurse + 1 ;
        }
        else if(f_owner == 'Private Practice - Clinical Officer')
        {
            pp_clinical = pp_clinical + 1;
        }
        else if(f_owner == 'Private Practice - General Practitioner')
        {
            pp_general = pp_general + 1;
        }
        else if(f_owner == 'Non-Governmental Organizations')
        {
            non_government = non_government + 1;
        }
        else if(f_owner == 'Other Faith Based')
        {
            other_faith = other_faith + 1;
        }

        else if(f_owner == 'Christian Health Association of Kenya')
        {
            christian = christian + 1;
        }
      
         else{
            other_owners = other_owners + 1;
        }
    }

    }
    else if(region == 'Sub_County'){
        if(Sub_county == region_name){
            if(f_owner == 'Ministry of Health'){
                min_health = min_health + 1 ;
            }
            else if(f_owner == 'Private Practice - Private Institution Academic'){
                pp_academic = pp_academic + 1 ;
            }
             else if(f_owner == 'Kenya Episcopal Conference-Catholic Secretariat'){
                catholic = catholic + 1 ;
            }
             else if(f_owner == 'Private Practice - Nurse / Midwifery'){
                pp_nurse = pp_nurse + 1 ;
            }
            else if(f_owner == 'Private Practice - Clinical Officer')
            {
                pp_clinical = pp_clinical + 1;
            }
            else if(f_owner == 'Private Practice - General Practitioner')
            {
                pp_general = pp_general + 1;
            }
            else if(f_owner == 'Non-Governmental Organizations')
            {
                non_government = non_government + 1;
            }
            else if(f_owner == 'Other Faith Based')
            {
                other_faith = other_faith + 1;
            }
        
            else if(f_owner == 'Christian Health Association of Kenya')
            {
                christian = christian + 1;
            }
          
             else{
                other_owners = other_owners + 1;
            }
    }
    }

    else if(region == 'Ward'){
      if(Ward == region_name){
        if(f_owner == 'Ministry of Health'){
            min_health = min_health + 1 ;
        }
        else if(f_owner == 'Private Practice - Private Institution Academic'){
            pp_academic = pp_academic + 1 ;
        }
         else if(f_owner == 'Kenya Episcopal Conference-Catholic Secretariat'){
            catholic = catholic + 1 ;
        }
         else if(f_owner == 'Private Practice - Nurse / Midwifery'){
            pp_nurse = pp_nurse + 1 ;
        }
        else if(f_owner == 'Private Practice - Clinical Officer')
        {
            pp_clinical = pp_clinical + 1;
        }
        else if(f_owner == 'Private Practice - General Practitioner')
        {
            pp_general = pp_general + 1;
        }
        else if(f_owner == 'Non-Governmental Organizations')
        {
            non_government = non_government + 1;
        }
        else if(f_owner == 'Other Faith Based')
        {
            other_faith = other_faith + 1;
        }
      
        else if(f_owner == 'Christian Health Association of Kenya')
        {
            christian = christian + 1;
        }
      
         else{
            other_owners = other_owners + 1;
        }
}
  }

    else{
            if(f_owner == 'Ministry of Health'){
                min_health = min_health + 1 ;
            }
            else if(f_owner == 'Private Practice - Private Institution Academic'){
                pp_academic = pp_academic + 1 ;
            }
             else if(f_owner == 'Kenya Episcopal Conference-Catholic Secretariat'){
                catholic = catholic + 1 ;
            }
             else if(f_owner == 'Private Practice - Nurse / Midwifery'){
                pp_nurse = pp_nurse + 1 ;
            }
            else if(f_owner == 'Private Practice - Clinical Officer')
            {
                pp_clinical = pp_clinical + 1;
            }
            else if(f_owner == 'Private Practice - General Practitioner')
            {
                pp_general = pp_general + 1;
            }
            else if(f_owner == 'Non-Governmental Organizations')
            {
                non_government = non_government + 1;
            }
            else if(f_owner == 'Other Faith Based')
            {
                other_faith = other_faith + 1;
            }
          
            else if(f_owner == 'Christian Health Association of Kenya')
            {
                christian = christian + 1;
            }
          
             else{
                other_owners = other_owners + 1;
            }
    }
})

 //calculate maximum
 var f_owner_max = min_health;
 if(pp_academic > f_owner_max)
 {
  f_owner_max = pp_academic;
 }
 else if(catholic > f_owner_max)
 {
  f_owner_max = catholic;
 }
 else if(non_government > f_owner_max)
 {
  f_owner_max = non_government;
 }
 else if(pp_clinical > f_owner_max)
 {
  f_owner_max = pp_clinical;
 }
 else if(pp_general > f_owner_max)
 {
  f_owner_max = pp_general;
 }
 else if(pp_nurse > f_owner_max)
 {
  f_owner_max = pp_nurse;
 }
 else if(christian > f_owner_max)
 {
  f_owner_max = christian;
 }
 else if(other_faith > f_owner_max)
 {
  f_owner_max = other_faith; 
 }
 else if(other_owners > f_owner_max)
 {
  f_owner_max = other_owners;
 }
 else{

 }

 f_owner_max = f_owner_max + 1;
 f_owner_max = Math.ceil((f_owner_max )/ 10) * 10;
           
if(chart == "bar_graph")
{
  var title_name;
  var y_axis_text = "Number of Facilities";
  if(region_name == "kenya")
  {
     title_name = "Facilities distribution in Kenya based on facility owners";
     
  }
  else{
    title_name = region_name+"  "+region+" Facilities distribution based on facility owners";
   
  }
    var chartData = {
    type: 'bar',
    "title":{  
        "text": title_name  
        }, 
        "scale-y":{  
          'min-value': 0,
          'max-value': f_owner_max,
            label: { /* Scale Title */
            text: y_axis_text,
            },
            "items-overlap":true,  
            "item":{  
                "font-angle":-90,
                 "offset-x":"7px"
                }
            },
            plot: {
              styles: [ "blue", "green", "#800080", "#F535AA","yellow", "brown", "#151B54", "orange", "#6AFB92","red" ]
             },
        "scale-x":{  
            label: { /* Scale Title */
            text: "Facility Owners",
            },
            labels: ["Ministry <br> of health", "non <br> Governmental", "Catholic <br> Secretariet ", 
            "Christian <br> health Associations", "other <br> faith Based", "Private academic <br> Institution ", 
            " PP General <br> Practitioner","PP Clinical <br> Officer", "PP nurse/ <br> Midwifery", "Other<br> Owners"]
            
            },
    series: [
        { 
            values: [min_health, non_government, catholic, christian, other_faith, 
                pp_academic, pp_general, pp_clinical, pp_nurse, other_owners],
            'background-color': "#6666FF"
        },
    ]
    };
    zingchart.render({
    id: 'myChart',
    data: chartData,
    width: "90%"
    });
}
else if(chart == "pie_chart")
{
  var title_name;
var mytitle;
if(region_name == "kenya")
{

    mytitle = "Facilities distribution rate based on facility Owners in Kenya";
}
else{
  title_name = region_name+"  "+region;
  mytitle = title_name+" Facility  distribution rate based on facility Owners";
}
    ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
    var myConfig = {
      type: "pie",
      plot: {
        borderColor: "#2B313B",
        borderWidth: 2,
        // slice: 90,
        valueBox: {
          placement: 'out',
          text: '%t\n%npv%',
          fontFamily: "Open Sans"
        },
        tooltip: {
          fontSize: '18',
          fontFamily: "Open Sans",
          padding: "5 10",
          "text":"%t (%v)"
        },
        animation: {
          effect: 2,
          method: 5,
          speed: 900,
          sequence: 1,
          delay: 50
        }
      },

      title: {
        fontColor: "#8e99a9",
        text: mytitle,
        align: "center",
        offsetX: 10,
        fontFamily: "Open Sans",
        fontSize: 20
      },
      plotarea: {
        margin: "20 0 0 0"
      },
      series: [
        {
            text:  "non Governmental", 
            values: [non_government],
            backgroundColor: '#7D0552',
            detached: true
          },
        {
            text: "Catholic Secretariet ", 
           
            values: [catholic],
            backgroundColor: '#FF69B4'
          },
        {
            values: [christian],
            text:  "Christian health Associations", 
            backgroundColor: '#FF7965',
            detached: true
          },
          {
            text: "other faith Based", 
            values: [faith_based],
            backgroundColor: '#9400D3'
          },
        {
            values: [pp_academic],
            text: "PP Private academic Institutions ", 
            
            backgroundColor: '#FFCB45',
            detached: true
          },
      
         
        
          {
            text: " PP General Practitioners",
            values: [pp_general],
            backgroundColor: '#191970'
          },
          {
            text: "PP Clinical Officer", 
            values: [pp_clinical],
            backgroundColor: '#6877e5',
            detached: true
          },

          {
            text: "PP nurse/Midwifery", 
            values: [pp_nurse],
            backgroundColor: '#6FB07F',
            detached: true
          },
    {
            values: [min_health],
            text: "Ministry of health",
            backgroundColor: '#50ADF5',
            detached: true
          },
    
        {
          text: "Other Owners",
          values: [other_owners],
          backgroundColor: '#696969'
        }
      ]
    };
 
    zingchart.render({
      id: 'mypieChart',
      data: myConfig,
      height: '100%',
      width: '100%'
    });
}
else
{
    console.log("Nothing done");
}

}

//end of facility owner
