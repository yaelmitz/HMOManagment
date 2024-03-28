package com.javatpoint.controller;
import com.javatpoint.model.CoronaDetails;
import com.javatpoint.model.Vaccination;
import com.javatpoint.model.HmoMember;
import com.javatpoint.service.CoronaDetailsRepository;
import com.javatpoint.service.HmoMemberRepository;
import com.javatpoint.service.MapStructMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import com.javatpoint.model.HmoMember;
import org.springframework.web.multipart.MultipartFile;
import com.javatpoint.service.VaccinationRepository;

import javax.validation.Valid;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/coronaDetails")
@CrossOrigin
public class CoronaDetailsController {
    private CoronaDetailsRepository coronaDetailsRepository;
    private VaccinationRepository vaccinationRepository;

    @Autowired
    public CoronaDetailsController(CoronaDetailsRepository coronaDetailsRepository, VaccinationRepository vaccinationRepository) {
        this.coronaDetailsRepository = coronaDetailsRepository;
        this.vaccinationRepository = vaccinationRepository;
    }

    //upload corona detailes per hmo member
    @PostMapping("/uploadCoronaDetails")
    public ResponseEntity<CoronaDetails> uploadCoronaDetails(@Valid @RequestBody CoronaDetails coronaDetails) {
        try {
            // Save the associated Vaccination entities first
            Vaccination vac1 = coronaDetails.getVac1();
            Vaccination vac2 = coronaDetails.getVac2();
            Vaccination vac3 = coronaDetails.getVac3();
            Vaccination vac4 = coronaDetails.getVac4();

            // To allow updating corona details without completing all vaccinations (in case you have not been vaccinated 4 times)
            if (vac1 != null) {
                vac1 = vaccinationRepository.save(vac1);
            }
            if (vac2 != null) {
                vac2 = vaccinationRepository.save(vac2);
            }
            if (vac3 != null) {
                vac3 = vaccinationRepository.save(vac3);
            }
            if (vac4 != null) {
                vac4 = vaccinationRepository.save(vac4);
            }

            coronaDetails.setHmoMember(coronaDetails.getHmoMember());

            coronaDetails.setVac1(vac1);
            coronaDetails.setVac2(vac2);
            coronaDetails.setVac3(vac3);
            coronaDetails.setVac4(vac4);

            // Now save the CoronaDetails entity
            CoronaDetails newCoronaDetails = coronaDetailsRepository.save(coronaDetails);

            return new ResponseEntity<>(newCoronaDetails, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace(); // Print the full stack trace for debugging
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //get all coronaDetails
    @GetMapping("/get")
    public ResponseEntity<List<CoronaDetails>> getCoronaDetails() {
        try {
            List<CoronaDetails> coronaDetails = new ArrayList<>();
            coronaDetailsRepository.findAll().forEach((e -> coronaDetails.add(e)));
            return new ResponseEntity<>(coronaDetails, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //bonus question 3.2
    //get the count of Hmo members which are unvaccinated
    @GetMapping("/unvaccinated-count")
    public ResponseEntity<Long> getUnvaccinatedMembersCount() {
        try {
            long unvaccinatedCount = coronaDetailsRepository.countByVac1IsNullAndVac2IsNullAndVac3IsNullAndVac4IsNull();
            return new ResponseEntity<>(unvaccinatedCount, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //bonus question 3.1
    //get an array containing for each day (according to the index) in the last month the number of active corona patients.
    @GetMapping("/active-patients-last-month")
    public ResponseEntity<Long[]> getActivePatientsLastMonth() {
        try {
            LocalDate currentDate = LocalDate.now();
            LocalDate startDate = currentDate.minusMonths(1).withDayOfMonth(1); // First day of last month- היום הראשון בחודש של התאריך הנוכחי פחות חודש אחד
            LocalDate endDate = currentDate.withDayOfMonth(1).minusDays(1); // Last day of last month- היום הראשון בחודש הנוכחי פחות אחד

            Long[] activePatientsCountByDay = new Long[endDate.getDayOfMonth()]; // Array to store count for each day- מספר הימים בחודש לפי היום בחודש של התאריך האחרון

            for (LocalDate date = startDate; date.isBefore(endDate.plusDays(1)); date = date.plusDays(1)) {//לולאה שעוברת על כל הימים בחודש האחרון
                //Corona patient is active for a certain day if the date of receiving the positive is before the date of the tested day and the date of recovery is greater or has not yet been updated
                long activePatientsCount = coronaDetailsRepository.countByRecoveryDateIsNullOrRecoveryDateAfterAndGetPositiveBefore(date,date);
                activePatientsCountByDay[date.getDayOfMonth() - 1] = activePatientsCount; // Index starts from 0
            }
            return new ResponseEntity<>(activePatientsCountByDay, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    private Vaccination saveVaccination(Vaccination vaccination) {
        if (vaccination != null) {
            return vaccinationRepository.save(vaccination);
        }
        return null;
    }
   @PutMapping("/updateCoronaDetails/{id}")
    public ResponseEntity<CoronaDetails> updateCoronaDetails(@PathVariable Long id,@Valid @RequestBody CoronaDetails coronaDetails) {
       CoronaDetails c=coronaDetailsRepository.findById(id).orElse(null);
       if(c!=null)
       {
         c.setGetPositive(coronaDetails.getGetPositive());
         c.setRecoveryDate(coronaDetails.getRecoveryDate());
         c.setVac1(saveVaccination(coronaDetails.getVac1()));
         c.setVac2(saveVaccination(coronaDetails.getVac2()));
         c.setVac3(saveVaccination(coronaDetails.getVac3()));
         c.setVac4(saveVaccination(coronaDetails.getVac4()));
         c.setHmoMember(coronaDetails.getHmoMember());

           coronaDetailsRepository.save(c);
           return new ResponseEntity<>(c,HttpStatus.OK);
       }
    else{
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
    }


    @DeleteMapping("/deleteCoronaById/{id}")
    public ResponseEntity<HttpStatus>deleteCoronaById(@PathVariable Long id) {
        try{
            coronaDetailsRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        catch (Exception e){
         System.out.println(e);
         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }}

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
