<?php 
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/PHPMailer.php'
    require 'phpmailer/src/Exception.php'

    $mail = new PHPMailer(true);
    $mail->CharSet = "UTF-8";
    $mail->setLanguage('ru','phpmailer/language/');
    $mail->IsHTML(true);

    // от кого письмо
    $mail->setForm('mail@mail.com', 'name');
    // кому письмо
    $mail->addAddress('mail@mail.com');
    // тема письма
    $mail->Subject = 'theme';

    
    /* ФОРМА SELECT */
    $service = "Landing Page";
    if ($_POST['service'] == "corp") {
        $service = "Корпоративный"
    }

    /* ----------------------- */

    $body.= '<h1>Mail<h1>';

    if (trim(!empty($_POST['name']))) {
        $body.='<p><strong>Name:<strong> '.$_POST['name'].'</p>';
    }
    if (trim(!empty($_POST['email']))) {
        $body.='<p><strong>Email:<strong> '.$_POST['email'].'</p>';
    }
    if (trim(!empty($_POST['message']))) {
        $body.='<p><strong>Message:<strong> '.$_POST['message'].'</p>';
    }

    /* ПРИКРЕПИТЬ ФАЙЛ */    
    /* if (trim(!empty($_FILES['image']['tmp_name']))) {
        //путь загрузки файла
        $filePath = __DIR__ . "/files" . $_FILES['image']['name'];
        //грузим файл
        if (copy($_FILES['image']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body.='<p><strong>Image</strong></p>';
            $mail->addAttachment($fileAttach);
        }
        
    } */
    /* -------------------------------------------- */

    $mail->Body = $body;

    if(!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены!'
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>