import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

function SimpleQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState({ paragraphs: [], listItems: [] });
  const [firstName, setFirstName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");

  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = `
    Bonjour chatGPT, tu es astrologue, tu as été engagé par un client pour répondre à ses questions sur son avenir. Voici les informations sur ton client :
    Prénom: ${firstName}
    Date de naissance: ${birthDate}
    Heure de naissance: ${birthTime}
    Lieu de naissance: ${birthPlace}
    Pour commencer, peux-tu tirer 13 cartes de tarot de marseilles au hasard et les indiquer dans ta réponse sous forme de liste ? Tu dois impérativement commencer la réponsee comme suit : 'Voici 13 cartes de tarot de Marseilles tirées au hasard :'.


    En suite, en t'aidant de l'analyse de son thème astrale, de son horoscope pour l'année 2023, et de l'analyse des cartes de tarot tirées peux-tu répondre à la question suivante : ${question}


    J'aimerais que tu réponde précisément et que tu donnes des exemples dans ta réponse. Finis chaque paragraphe par un conseil personnalisés, évite les phrases trop généralistes. Aussi dans l'astrologie les gens sont plus sensibles aux conseils qui portent sur leurs relations et l'humain que sur le matériel.
    Enlève les formules d'incertitude, nous savons que le tarot est inexacte, pas besoin de le rappeler. Romance un peu ta réponse. Réponds en moins de 512 caractères et fait des paragraphes courts.
    `;

    try {
      const result = await axios.post(
        `https://api.openai.com/v1/engines/text-davinci-003/completions`,
        {
          prompt,
          max_tokens: 512,
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
      <form onSubmit={handleSubmit}>
        <div className="Form">
          <div className="Form-astral">
            <div>
              <label className="Form-label-astral">Prénom : </label>
              <input
                className="Form-input-astral"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="Form-label-astral">Date de naissance : </label>
              <input
                className="Form-input-astral"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="Form-label-astral">Heure de naissance : </label>
              <input
                className="Form-input-astral"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="Form-label-astral">Lieu de naissance : </label>
              <input
                className="Form-input-astral"
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="Form-Question">
          <label className="Form-label-question">Question : </label>
          <input
            className="Form-input-question"
            type="text"
            value={question}
            onChange={handleChangeQuestion}
            placeholder="Posez votre question ici..."
            required
          />
          <IconContext.Provider value={{ className: "iconSearch" }}>
              <FaSearch />
          </IconContext.Provider>
        </div>
        <div className="Button-submit-div">
          <button className="Button" type="submit">
            Demander au voyant
          </button>
        </div>
      </form>
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
  );
}

export default SimpleQuestion;
