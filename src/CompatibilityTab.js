import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

const CompatibilityTab = () => {
  const [person1, setPerson1] = useState({ name: '', dob: '', pob: '', tob: '' });
  const [person2, setPerson2] = useState({ name: '', dob: '', pob: '', tob: '' });
  const [compatibilityType, setCompatibilityType] = useState('amoureuse');
  const [answer, setAnswer] = useState({ paragraphs: [], listItems: [] });

  const handlePersonChange = (e, person) => {
    const { name, value } = e.target;
    person === 'person1' ? setPerson1({ ...person1, [name]: value }) : setPerson2({ ...person2, [name]: value });
  };

  const handleCompatibilityTypeChange = (e) => {
    setCompatibilityType(e.target.value);
  };

  const createPrompt = (person1, person2, compatibilityType) => {
    return `Bonjour chatGPT, tu es astrologue, tu as été engagé par un client pour calculer sa compatibilité ${compatibilityType} avec une autre personne.
            Voici les informations sur ton client :
            Prénom: ${person1.name}
            Date de naissance: ${person1.dob}
            Heure de naissance: ${person1.tob}
            Lieu de naissance: ${person1.pob}

            Voici les informations sur la deuxieme personne :
            Prénom: ${person2.name}
            Date de naissance: ${person2.dob}
            Heure de naissance: ${person2.tob}
            Lieu de naissance: ${person2.pob}

            Pour commencer, peux-tu tirer 13 cartes de tarot de marseilles au hasard et les indiquer dans ta réponse sous forme de liste ? Tu dois impérativement commencer ta réponse comme suit : 'Voici 13 cartes de tarot de Marseilles tirées au hasard :'.

            En suite, en t'aidant de l'analyse de leur thème astrale, de leur horoscope pour l'année 2023, et de l'analyse des cartes de tarot tirées peux-tu répondre à la question suivante : Est-ce que ${person1.name} et ${person2.name} ont une bonne compatibilité ${compatibilityType} ?

            J'aimerais que tu réponde précisément et que tu donnes des exemples dans ta réponse. Finis chaque paragraphe par un conseil personnalisés, évite les phrases trop généralistes. Aussi dans l'astrologie les gens sont plus sensibles aux conseils qui portent sur leurs relations et l'humain que sur le matériel. Conclu ta réponse avec une réponse par "oui" ou par "non" pour savoir si ces deux personnes sont compatibles.
            Enlève les formules d'incertitudes, nous savons que le tarot est inexacte, pas besoin de le rappeler. Romance un peu ta réponse. Réponds en moins de 1024 caractères et fait des paragraphes courts.
            `;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const prompt = createPrompt(person1, person2, compatibilityType);

  try {
    const result = await axios.post(
      `https://api.openai.com/v1/engines/text-davinci-003/completions`,
      {
        prompt,
        max_tokens: 1024,
        n: 1,
        stop: null,
        temperature: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
      }
    );

    const generatedText = result.data.choices[0].text.trim();
    const listStart =
      "Voici 13 cartes de tarot de Marseilles tirées au hasard :";
    const listEnd = ".";
    const listStartIndex = generatedText.indexOf(listStart);
    const listEndIndex = generatedText.indexOf(listEnd, listStartIndex);
    let listItems = [];

    if (listStartIndex >= 0 && listEndIndex > listStartIndex) {
      const listString = generatedText.slice(
        listStartIndex + listStart.length,
        listEndIndex
      );
      listItems = listString.split(",").map((item) => item.trim());
    }

    const paragraphs = generatedText
      .split("\n")
      .filter((paragraph, index) => index !== listStartIndex);

    setAnswer({ paragraphs, listItems });
  } catch (error) {
    console.error("Error fetching data from OpenAI API:", error);
    setAnswer("An error occurred. Please try again.");
  }
};

  return (
    <div className="Container">
    <div className="Form">

      {/* Radio buttons for compatibility type */}
      <h3>Type de compatibilité</h3>
      <div className="radio-form">

        <input
          type="radio"
          value="amoureuse"
          checked={compatibilityType === "amoureuse"}
          onChange={handleCompatibilityTypeChange}
          id="amoureuse"
        />
        <label for="amoureuse">
          Amoureuse
        </label>

        <input
          type="radio"
          value="professionnelle"
          checked={compatibilityType === "professionnelle"}
          onChange={handleCompatibilityTypeChange}
          id="professionnelle"
        />
        <label for="professionnelle">
          Professionnelle
        </label>

        <input
          type="radio"
          value="amicale"
          checked={compatibilityType === "amicale"}
          onChange={handleCompatibilityTypeChange}
          id="amicale"
        />
        <label for="amicale">
          Amicale
        </label>
      </div>

      <div className="DoubleInputForm">

      {/* Inputs for Person 1 */}
      <div className="DoubleFormItem">
      <h3>Personne 1</h3>
      <div className="Form-astral">
      <div>
        <label className="Form-label-astral">
          Prénom :
          <input className="Form-input-astral" type="text" name="name" value={person1.name} onChange={(e) => handlePersonChange(e, 'person1')} required/>
        </label>
        </div>
        <div>
        <label className="Form-label-astral">
          Date de naissance :
          <input className="Form-input-astral" type="date" name="dob" value={person1.dob} onChange={(e) => handlePersonChange(e, 'person1')} required/>
        </label>
        </div>
        <div>
        <label className="Form-label-astral">
          Lieu de naissance :
          <input className="Form-input-astral" type="text" name="pob" value={person1.pob} onChange={(e) => handlePersonChange(e, 'person1')} required/>
        </label>
        </div>
        <div>
        <label className="Form-label-astral">
          Heure de naissance :
          <input className="Form-input-astral" type="time" name="tob" value={person1.tob} onChange={(e) => handlePersonChange(e, 'person1')} required/>
        </label>
        </div>
      </div>
      </div>

      {/* Inputs for Person 2 */}
      <div className="DoubleFormItem">
      <h3>Personne 2</h3>
      <div className="Form-astral">
      <div>
        <label className="Form-label-astral">
          Prénom :
          <input className="Form-input-astral" type="text" name="name" value={person2.name} onChange={(e) => handlePersonChange(e, 'person2')} required/>
        </label>
        </div>
        <div>
        <label className="Form-label-astral">
          Date de naissance :
          <input className="Form-input-astral" type="date" name="dob" value={person2.dob} onChange={(e) => handlePersonChange(e, 'person2')} required/>
        </label>
        </div>
        <div>
        <label className="Form-label-astral">
          Lieu de naissance :
          <input className="Form-input-astral" type="text" name="pob" value={person2.pob} onChange={(e) => handlePersonChange(e, 'person2')} required/>
        </label>
        </div>
        <div>
        <label className="Form-label-astral">
          Heure de naissance :
          <input className="Form-input-astral" type="time" name="tob" value={person2.tob} onChange={(e) => handlePersonChange(e, 'person2')} required/>
        </label>
        </div>
      </div>
    </div>
    </div>

    {/* Submit button */}
    <div className="Button-submit-div">
      <button className="Button" onClick={handleSubmit}>
        Calculer la compatibilité
      </button>
    </div>

    {/* Display the response */}
    <div className="Reponse-paragraphs">
      {answer.paragraphs.length > 0 && (
        <div>
          <h2>Réponse :</h2>
          <p>Voici 13 cartes de tarot de Marseilles tirés au hasard :</p>
          {answer.listItems.length > 0 && (
            <ul>
              {answer.listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          {answer.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  </div>
  </div>
  );
};

export default CompatibilityTab;
