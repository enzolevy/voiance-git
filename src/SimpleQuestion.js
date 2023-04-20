import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";

function SimpleQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState({ paragraphs: [], listItems: [] });
  const [firstName, setFirstName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [tarotCheck, setTarotCheck] = useState(false);
  const [mbtiCheck, setMbtiCheck] = useState(false);
  const [mbtiProfile, setMbtiProfile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleTarotCheckChange = (e) => {
    setTarotCheck(e.target.checked);
  };

  const handleMbtiCheckChange = (e) => {
    setMbtiCheck(e.target.checked);
  };

  const handleMbtiProfileChange = (e) => {
    setMbtiProfile(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Afficher le loader

    let mbtiPromptInstruction = "";
    let mbtipromptAnalysis ="";
    if (mbtiCheck) {
      mbtiPromptInstruction = `Profil MBTI: ${mbtiProfile}`;
      mbtipromptAnalysis = `- Son profil MBTI`
    }

    let tarotPromptInstruction = "";
    let tarotPromptAnalysis =""
    if (tarotCheck) {
      tarotPromptInstruction = `
      Pour commencer, peux-tu tirer 13 cartes de tarot de marseilles au hasard et les indiquer dans ta réponse sous forme de liste ? Tu dois impérativement commencer la réponsee comme suit : 'Voici 13 cartes de tarot de Marseilles tirées au hasard :'.
      `;
      tarotPromptAnalysis = `- L'analyse des cartes de tarots tirées`
    }

    const  prompt = `Bonjour chatGPT, tu es astrologue, tu as été engagé par un client pour répondre à ses questions sur son avenir. Voici les informations sur ton client :
                    Prénom: ${firstName}
                    Date de naissance: ${birthDate}
                    Heure de naissance: ${birthTime}
                    Lieu de naissance: ${birthPlace}
                    ${mbtiPromptInstruction}

                    ${tarotPromptInstruction}

                    En t'aidant de l'analyse des éléments suivants peux-tu répondre à la question suivante : ${question}
                    - Son thème astrale,
                    - Son horoscope pour l'année 2023
                    ${tarotPromptAnalysis}
                    ${mbtipromptAnalysis}

                    J'aimerais que tu réponde précisément et que tu donnes des exemples dans ta réponse. Finis chaque paragraphe par un conseil personnalisés, évite les phrases trop généralistes. Aussi dans l'astrologie les gens sont plus sensibles aux conseils qui portent sur leurs relations et l'humain que sur le matériel.
                    Enlève les formules d'incertitude, nous savons que le tarot est inexacte, pas besoin de le rappeler. Romance un peu ta réponse. Réponds en moins de 1024 caractères et fait des paragraphes courts.
                    `;

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from OpenAI API:", error);
      setAnswer("An error occurred. Please try again.");
      setLoading(false);
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

      <div className="Form-Option">
        <div>
          <label className="Form-label-astral">
          <input
            className="Form-checkbox-astral"
            type="checkbox"
            checked={tarotCheck}
            onChange={handleTarotCheckChange}
          />
          Cartes de tarot
          </label>
        </div>
        <div>
            <label>
              <input
                type="checkbox"
                checked={mbtiCheck}
                onChange={handleMbtiCheckChange}
              />
              Profil MBTI
            </label>
            {mbtiCheck && (
              <select
                className="Select-Mbti"
                value={mbtiProfile}
                onChange={handleMbtiProfileChange}
                required={mbtiCheck}
              >
                <option value="">Choisissez un profil MBTI</option>
                <option value="ISTJ">ISTJ</option>
                <option value="ESTJ">ESTJ</option>
                <option value="ISTP">ISTP</option>
                <option value="ESTP">ESTP</option>
                <option value="ISFJ">ISFJ</option>
                <option value="ESFJ">ESFJ</option>
                <option value="ISFP">ISFP</option>
                <option value="ESFP">ESFP</option>
                <option value="INFJ">INFJ</option>
                <option value="ENFJ">ENFJ</option>
                <option value="INFP">INFP</option>
                <option value="ENFP">ENFP</option>
                <option value="INTP">INTP</option>
                <option value="ENTP">ENTP</option>
                <option value="INTJ">INTJ</option>
                <option value="ENTJ">ENTJ</option>
              </select>
            )}
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

      {/* Display the response */}
      {loading ? (
      <div className="Loader">
        <FaSpinner className="Spinner" />
      </div>
      ) : (
      <div className="Reponse-paragraphs">
        {answer.paragraphs.length > 0 && (
          <div>
            <h2>Réponse :</h2>
            {tarotCheck && (
              <>
              <p>Voici 13 cartes de tarot de Marseilles tirées au hasard :</p>
              {answer.listItems.length > 0 && (
                <ul>
                  {answer.listItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
              </>
            )}
            {answer.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
      )}
    </div>

  );
}

export default SimpleQuestion;
