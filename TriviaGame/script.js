$(document).ready(function(){
    var score = 0;
    var answer = "";
    var questions = 9;
    var difficulty;
    var category;
    // MUSIC EASY
    $('.category-point-box').click(function(){
        if(answer == ""){
            difficulty = $(this).attr('difficulty')
            category = $(this).attr('category')
            console.log(difficulty, category)
            $(this).slideUp();
            $('.'+category+'-'+difficulty+'-question').slideDown();
            $.get('https://opentdb.com/api.php?amount=1&category='+category+'&difficulty='+difficulty+'&type=multiple', trivia)
        }
    // Q&A GENERATOR FUNCTION
    })
    function trivia(res){
        console.log(res.results[0]);
        console.log(category)
        console.log(difficulty)
        let question = res.results[0].question;
        let these_answers = [res.results[0].correct_answer, res.results[0].incorrect_answers[0], res.results[0].incorrect_answers[1], res.results[0].incorrect_answers[2]].sort();
        $('.'+category+'-'+difficulty+'-question').append('<p>'+question+'</p>');
        answer = res.results[0].correct_answer
        console.log(answer)
        for(idx in these_answers){
            $('.'+category+'-'+difficulty+'-question').append('<div class="answer-btn-wrapper"><button class="answer-btn" value="'+these_answers[idx]+'" difficulty="'+difficulty+'" category="'+category+'">'+these_answers[idx]+'</button></div>');
        }
    }
    $(document).on('click', '.answer-btn', function(){
        if(this.value === answer){
            if(difficulty == 'easy'){
                score += 100;
            }
            else if(difficulty == 'medium'){
                score += 200;
            }
            else if(difficulty == 'hard'){
                score += 300;
            }
            $('#score').text("Score: "+score);
            alert("Correct Answer!");
        }
        else if(this.value !== answer){
            alert("Incorrect. The correct answer was "+answer);
        }
        answer = "";
        questions -= 1;
        $('.'+category+'-'+difficulty+'-question').slideUp();
        $('.'+category+'-'+difficulty+'-answered').slideDown();
    })
    $(document).on('click', '#reset', function(){
        // if(questions === 0){
            $('.category-question-answered').hide();
            $('.category-trivia-box').hide();
            $('.category-point-box').show();
            $('.category-trivia-box').html("");
            questions = 9;
        // }
        // else {
        //     alert('You need to answer all available questions before loading new questions.')
        // }
    })
})