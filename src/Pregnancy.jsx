import './App.css';

function Pregnancy() {

    return(
        <div className='containter'>
            <h1>Pregnancy Record Part-B</h1> <br /><br />

            <form action="Health">

                <div className='Register'>
                    <label htmlFor="regNo">Registration No.:</label>
                    <input type="text" />
                </div>

                <div className='Register'>
                    <label htmlFor="regDate">Registration Date:</label>
                    <input type="text" />
                </div>

                <div className='Register'>
                    <label htmlFor="regPlace">Registration Place:</label>
                    <input type="text" />
                </div>

                <div className='Register'>
                    <label htmlFor="regFam">D.O.R in the family registry</label>
                    <input type="text" />
                </div>

                <div className='Register'>
                    <label htmlFor="regArea">Grama Niladari Area:</label>
                    <input type="text" />
                </div>

                <div className='Register'>
                    <label htmlFor="midwife">Midwife Area:</label>
                    <input type="text" />
                </div>

                <hr /> <br />

                <div>
                    <label htmlFor="name">Pregnant Mother's Name:</label>
                    <input type="name" name='name'/>
                </div>

                <div className='age'>
                    <label htmlFor="age">Mother's Age:</label>
                    <input type="text" name='age'/>
                </div>

                <div>
                    <label htmlFor="name">Husband's Name:</label>
                    <input type="text" name='name'/>
                </div>

                <div className='age'>
                    <label htmlFor="age">Husband's Age:</label>
                    <input type="text" name='age'/>
                </div>

                <div>
                    <label htmlFor="address">Address:</label>
                    <textarea type="text" name='address' rows={5} cols={10}/>
                </div>

                <div>
                    <label htmlFor="contact">Contact No.:</label>
                    <input type="text" name='contact'/>
                </div>

                <div>
                    <label htmlFor="eduMother">Mother's Education Qualifications:</label>
                    <textarea type="text" name='eduMother' rows={5} cols={10}/>
                </div>

                <div>
                    <label htmlFor="eduFather">Husband's Education Qualifications:</label>
                    <textarea type="text" name='eduFather' rows={5} cols={10}/>
                </div>

                <div className='job'>

                    <label htmlFor="motherJob">Mother's Profession:</label>
                    <input type="text" name='motherJob'/>

                    <label htmlFor="distance">Distance to mother's workplace:</label>
                    <input type="text" name='distance'/>

                    <label htmlFor="husbandJob">Husband's Profession:</label>
                    <input type="text" name='husbandJob'/>

                </div>

                <div>
                    <label htmlFor="age">Mother's age at the marriage:</label>
                    <input type="text" className= 'age' name='age'/>
                </div>

                <br /><hr /><br />

                <div className='radio'>
                    <div>
                        <label htmlFor="relative">A marriage between blood relatives ?</label> <br />
                        <label htmlFor="relative">
                            <input type="radio" id="yes" name="relative" value="Yes" />
                            Yes 
                        </label>
                        <label htmlFor="relative">
                            <input type="radio" id="no" name="relative" value="no" />
                            No
                        </label>
                    </div>
                    
                    <div>
                        <label htmlFor="vaccine">Have you vaccined the Rubella ?</label> <br />
                        <label htmlFor="vaccine">
                            <input type="radio" id="yes" name="vaccine" value="Yes" />
                            Yes 
                        </label>
                        <label htmlFor="vaccine">
                            <input type="radio" id="no" name="vaccine" value="no" />
                            No
                        </label>
                    </div>

                    <div>
                        <label htmlFor="prenatal">Have you had the prenatal checkup ?</label> <br />
                        <label htmlFor="prenatal">
                            <input type="radio" id="yes" name="prenatal" value="Yes" />
                            Yes 
                        </label>
                        <label htmlFor="prenatal">
                            <input type="radio" id="no" name="prenatal" value="no" />
                            No
                        </label>
                    </div>

                    <div>
                        <label htmlFor="folic">Have you taken the folic acid ?</label> <br />
                        <label htmlFor="folic">
                            <input type="radio" id="yes" name="folic" value="Yes" />
                            Yes 
                        </label>
                        <label htmlFor="folic">
                            <input type="radio" id="no" name="folic" value="no" />
                            No
                        </label>
                    </div>

                    <div>
                        <label htmlFor="fertility">Is there a history about sub fertility ?</label> <br />
                        <label htmlFor="fertility">
                            <input type="radio" id="yes" name="fertility" value="Yes" />
                            Yes 
                        </label>
                        <label htmlFor="fertility">
                            <input type="radio" id="no" name="fertility" value="no" />
                            No
                        </label>
                    </div>

                    <br /><hr /> <br />

                </div>

                <div className='currentStatus1'>
                    <h2>Current Pregnancy State</h2>

                    <div className= 'pregancyNo'>
                        <label htmlFor="pregancyNo">Which Pregnancy is this?</label>
                        <input type="number" />
                    </div>

                    <div className= 'childNo'>
                        <label htmlFor="childNo">Number of living children?</label>
                        <input type="number" />
                    </div>

                    <div className= 'youngest'>
                        <label htmlFor="youngest">Age of the youngest child?</label>
                        <input type="text" />
                    </div>

                    <div className= 'menstruation'>
                        <label htmlFor="menstruation">Date of last menstruation?</label>
                        <input type="date" />
                    </div>

                    <div className= 'hopedate'>
                        <label htmlFor="hopedate">Hope Date</label>
                        <input type="date" />
                    </div>

                    <div className= 'hopetime'>
                        <label htmlFor="hopetime">Hope time</label>
                        <input type="date" />
                    </div>

                    <div className= 'fetal'>
                        <label htmlFor="fetal">Date of first fetal movement</label>
                        <input type="date" />
                    </div>

                    <div className= 'noOfWeeks'>
                        <label htmlFor="noOfWeeks">Number of weeks pregnant at the time of Registration</label>
                        <input type="text" />
                    </div>

                    <div className= 'famPlan'>
                        <label htmlFor="famPlan">Did you use any family planning method before
                            getting pregnant ?? If so, what's the method ?
                        </label>
                        <textarea type="text" name='famPlan' rows={5} cols={10}/>
                    </div>


                </div>

                <div className='currentStatus2'>
                    <div className= 'minOrMax'>
                        <label htmlFor="minOrMax">Under 20 and over 35 years old</label>
                        <textarea type="text" name='minOrMax' rows={5} cols={5}/>
                    </div>

                    <div className= 'morePreg'>
                        <label htmlFor="morePreg">Five or more Pregnancies</label>
                        <textarea type="text" name='morePreg' rows={5} cols={5}/>
                    </div>
                </div>

                
                

            </form>

        </div>
    );
}

export default Pregnancy;
