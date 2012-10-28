exports.dimension = {
    Vulnerability : { label: "Vulnerability"},
    TreatmentEfficacy : { label: "TreatmentEfficacy"},
    PersonalEfficacy : { label : "PersonalEfficacy"},
    Severity : { label : "Severity"},
    RehabilitationValue : {label: "RehabilitationValue"}    
}

exports.answers = {
        VeryStronglyDisagree: {label: "Very Strongly Disagree", value : 1},        
        StronglyDisagree : {label: "Strongly Disagree", value : 2},
        Disagree : {label: "Disagree", value : 3},
        Neutral : {label: "Neutral", value : 4},
        Agree : {label: "Agree", value : 5},
        StronglyAgree : {label: "Strongly Agree", value : 6},
        VeryStronglyAgree : {label: "Very Strongly Agree", value : 7}    
}

exports.questions = [{
    Number: 1,
    Dimension: exports.dimension.Vulnerability,
    Description: "My recovery from injury may be hindered if I do not complete the rehabilitation program (RP).",
    Answers: exports.answers
}, {
    Number: 2,
    Dimension: exports.dimension.Vulnerability,
    Description: "In order to prevent a recurrence of this injury, my RP is essential.",
    Answers: exports.answers
}, {
    Number: 3,
    Dimension: exports.dimension.Vulnerability,
    Description: "The way to prevent my injury from worsening will be to follow my RP.",
    Answers: exports.answers
}, {
    Number: 4,
    Dimension: exports.dimension.Vulnerability,
    Description: "A successful and lasting recovery may not be possible if I do not complete my RP.",
    Answers: exports.answers
}, {
    Number: 5,
    Dimension: exports.dimension.Vulnerability,
    Description: "I am making it more likely that I will be reinjured by not doing what my RP involves.",
    Answers: exports.answers
}, {
    Number: 6,
    Dimension: exports.dimension.TreatmentEfficacy,
    Description: "The RP designed for me will ensure my complete recovery from this injury.",
    Answers: exports.answers
}, {
    Number: 7,
    Dimension: exports.dimension.TreatmentEfficacy,
    Description: "Completion of my RP will guarantee that I recover from my injury.",
    Answers: exports.answers
}, {
    Number: 8,
    Dimension: exports.dimension.TreatmentEfficacy,
    Description: "Following the advice that I have been given will have a very large impact upon how quickly I recover from this injury.",
    Answers: exports.answers
}, {
    Number: 9,
    Dimension: exports.dimension.TreatmentEfficacy,
    Description: "I have absolute faith in the effectiveness of my RP.",
    Answers: exports.answers
}, {
    Number: 10,
    Dimension: exports.dimension.PersonalEfficacy,
    Description: "I am very capable of successfully completing all aspects of my RP, even if it involves being less active or something which may be discomforting.",
    Answers: exports.answers
}, {
    Number: 11,
    Dimension: exports.dimension.PersonalEfficacy,
    Description: "I consider myself able to stick to my RP even though it may include activities which I do not enjoy.",
    Answers: exports.answers
}, {
    Number: 12,
    Dimension: exports.dimension.PersonalEfficacy,
    Description: "I will have no serious difficulty in following the instructions of my RP.",
    Answers: exports.answers
}, {
    Number: 13,
    Dimension: exports.dimension.PersonalEfficacy,
    Description: "I believe that I will stick with my RP despite any difficulties I may encounter.",
    Answers: exports.answers
}, {
    Number: 14,
    Dimension: exports.dimension.Severity,
    Description: "As injuries go, mine is serious.",
    Answers: exports.answers
}, {
    Number: 15,
    Dimension: exports.dimension.Severity,
    Description: "I see this injury as a serious threat to my sport/exercise involvement.",
    Answers: exports.answers
}, {
    Number: 16,
    Dimension: exports.dimension.Severity,
    Description: "I fear that this injury will affect my long-term sport/exercise involvement.",
    Answers: exports.answers
}, {
    Number: 17,
    Dimension: exports.dimension.Severity,
    Description: "This injury is too serious to not follow medical advice.",
    Answers: exports.answers
}, {
    Number: 18,
    Dimension: exports.dimension.RehabilitationValue,
    Description: "Being fully recovered is important to me.",
    Answers: exports.answers
}];