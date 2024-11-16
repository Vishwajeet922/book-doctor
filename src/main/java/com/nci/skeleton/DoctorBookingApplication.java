package com.nci.skeleton;

import com.nci.skeleton.entity.Doctor;
import com.nci.skeleton.repository.DoctorRepository;
import com.nci.skeleton.service.MasterDataService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class DoctorBookingApplication {

    public static void main(String[] args) {
        SpringApplication.run(DoctorBookingApplication.class, args);
    }

    @Bean
    public CommandLineRunner init(DoctorRepository doctorRepository) {
        return new CommandLineRunner() {

            @Override
            public void run(String... args) throws Exception {
                List<String> names=List.of("Suzanne Cromwell","Croix Lash", "Jaime Lindner",
                        "Aldair Butterworth","Jamilah Haupt","Odelia Diorio","Adel Welty",
                        "Donnie Conti","Alias Kubiak","Oshea Volz", "Lakai Chauvin", "Aziyah Falcone", "Cameryn Mariscal",
                        "Eivin Cooksey", "Jaziah Buie", "Fanny Lightner", "Alaa Gilpin", "Tarek Mahler", "Jeanna Trader", "Cyrus Gay");

                List<String> description=List.of("graduated from University College Dublin in 2010. He completed his internship in St.Vincent’s Hospital Dublin and spent a further year in hospital medicine. David completed the Royal College of Surgeons GP training programme, graduating in 2016. Dr. Gibson joined Hanover Medical in 2016.",
                        "graduated from UCD in General Nursing in 2013. She worked in the cardiology unit of Royal Bristol Infirmary for several years. worked in the High Dependency Unit of St.Vincent’s Private Hospital, and then Health Screening Ireland. Jacqueline joined Hanover Medical in 2019.",
                        "qualified from the Royal College of Surgeons in 1994. He spent 4 years training in surgery, including General Surgery, Orthopaedics, Urology, Cardiothoracic and Vascular surgery. After working for a year in Melbourne, Australia, he returned to GP practice in Trim in 2006. He established Hanover Medical Centre with Dr.Scott in 2009",
                        "graduated from Royal College of Surgeons in 2015. She completed her internship in St.Vincent’s Hospital Dublin in 2016. Following this she went directly in to the UCD HSE Dublin Mid - Leinster Training Specialist Scheme completing her GP training in January 2021.",
                        "Graduated from UCD in 2012. She completed a year of research at the B.C Children's and Women's Hospital in Vancouver, B.C. Canada in Reproductive Mental Health. She has worked as a GP in Dungarvan, Waterford and in Dublin before joining Hanover Medical in July 2021. She has a special interest in Women's Health with a particular emphasis in Contraception."
                        );

                List<String> address=List.of("7743 Honey Creek Lane Geneva, IL 60134","9208 Andover Lane Newtown, PA 18940",
                        "90 Newcastle Avenue Georgetown, SC 29440","5 Lancaster Street Port Richey, FL 34668",
                        "7287 Shirley St. Wisconsin Rapids, WI 54494","98 Fawn Street Chelmsford, MA 01824",
                        "9996 Cobblestone Lane Schaumburg, IL 60193","831 Beechwood Ave. Mount Pleasant, SC 29464",
                        "588 West Glenwood St. Saugus, MA 01906","79 Glendale St. Wethersfield, CT 06109",
                        "5 Blue Spring Dr. Lake Worth, FL 33460","31 Hill Street New Kensington, PA 15068"
                        );

                List<String> images=List.of("https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
                        "https://media.istockphoto.com/id/638647058/photo/we-offer-our-patients-premium-healthcare-here.jpg?s=612x612&w=0&k=20&c=pek5ehwgsZNPemeEh4bObQ1U5DRPEs0WHleosG-daa8=",
                        "https://cdn.pixabay.com/photo/2024/09/03/15/21/ai-generated-9019520_640.png",
                        "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsb2ZmaWNlMl9waG90b19vZl9hX2JsYWNrX3BsdXNfc2l6ZV9mZW1hbGVfZG9jdG9yX2luX2hvc19mOGU4MTBlMi1kOWEyLTQ5OTMtOWM0Zi1kNWI2OTQ5ODVmZTNfMi5qcGc.jpg",
                        "https://img.freepik.com/free-photo/medium-shot-doctor-posing-studio_23-2150275674.jpg",
                        "https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=926&fit=clip",
                        "https://media.istockphoto.com/id/1327024466/photo/portrait-of-male-doctor-in-white-coat-and-stethoscope-standing-in-clinic-hall.jpg?s=612x612&w=0&k=20&c=49wqOwwuonk9f8NACL7M_5RosqQPFwJ8-dpmeo9AvQw=",
                        "https://media.istockphoto.com/id/1372002650/photo/cropped-portrait-of-an-attractive-young-female-doctor-standing-with-her-arms-folded-in-the.jpg?s=612x612&w=0&k=20&c=o1QtStNsowOU0HSof6xQ_jZMglU8ZK565gHd655U6S4=",
                        "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
                        "https://www.shutterstock.com/image-photo/portrait-asian-female-doctor-wearing-600nw-2502070973.jpg",
                        "https://media.istockphoto.com/id/1389245890/photo/portrait-of-young-asian-male-doctor-on-blue-background.jpg?s=612x612&w=0&k=20&c=0uYrDuQGzGwdHTRfIog-ww17I2e6iNa1x2u88k-Q150=",
                        "https://media.istockphoto.com/id/577964288/photo/aged-general-practitioner.jpg?s=612x612&w=0&k=20&c=Jgng3nkX6S_I8yJXaeLEw3GpnTESTejFg9RAsVONJj0=",
                        "https://thumbs.dreamstime.com/b/asian-indian-male-medical-doctor-welcome-sign-portrait-smiling-standing-inside-hospital-holding-file-folder-showing-hand-39235691.jpg",
                        "https://cdn.create.vista.com/api/media/small/175549982/stock-photo-doctor",
                        "https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=",
                        "https://static.vecteezy.com/system/resources/thumbnails/028/287/384/small_2x/a-mature-indian-male-doctor-on-a-white-background-ai-generated-photo.jpg",
                        "https://st4.depositphotos.com/1017986/21088/i/450/depositphotos_210888716-stock-photo-happy-doctor-with-clipboard-at.jpg"
                );

                List<String> qualifications=List.of("MB Bch BAO, MICGP","LRCPI & LRCSI MB BCh BAO (NUI) DCH",
                        "LRCPI & SI MB BCh BAO (NUI) DCH MRCSI MRCGP DFSRH","MB BCh, BAO, MICGP, PgDip clinical science, DRCOG",
                        "MICGP, DRCOG, MsC","MB, BAO, BCh","MRCSI, MD","MS","MICGP, MBBD","LRCSI, MBBS");

                List<BigDecimal> prices=List.of(BigDecimal.valueOf(100),BigDecimal.valueOf(120),BigDecimal.valueOf(140),
                        BigDecimal.valueOf(50),BigDecimal.valueOf(80),BigDecimal.valueOf(90),BigDecimal.valueOf(300),
                        BigDecimal.valueOf(180),BigDecimal.valueOf(200),BigDecimal.valueOf(250),BigDecimal.valueOf(400));

                /*for (int i = 0; i <= 0; i++) {
                    Doctor testEntity=new Doctor();
                    testEntity.setId(UUID.randomUUID());
                    testEntity.setName(names.get(randomRangeRandom(0,19)));
                    testEntity.setDescription(testEntity.getName()+" "+description.get(randomRangeRandom(0,4)));
                    testEntity.setSpeciality(MasterDataService.data.getSpeciality().get(randomRangeRandom(0,14)));
                    testEntity.setPrice(prices.get(randomRangeRandom(0,10)));
                    testEntity.setQualification(qualifications.get(randomRangeRandom(0,9)));
                    testEntity.setExperience(String.valueOf(randomRangeRandom(5,20)));
                    testEntity.setAddress(address.get(randomRangeRandom(0,11)));
                    testEntity.setImage(images.get(randomRangeRandom(0,16)));
                    doctorRepository.save(testEntity);
                }*/
            }
        };
    }

    private int randomRangeRandom(int start, int end) {
        Random random = new Random();
        int number = random.nextInt((end - start) + 1) + start; // see explanation below
        return number;
    }


}
